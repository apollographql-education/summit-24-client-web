import { Box, useToast, Text, VStack } from "@chakra-ui/react";
import { Content, Image, InnerContainer, OuterContainer } from "./Card";
import { GuestReview } from "./TripReviews";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import {
  PastBooking_bookingFragment,
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables,
} from "./__generated__/PastBooking.types";
import { fragments } from "../apollo/fragments";

interface PastBookingProps {
  booking: PastBooking_bookingFragment;
}

fragments.register(gql`
  fragment PastBooking_booking on Booking {
    id
    checkInDate
    checkOutDate
    status
    guest {
      id
      name
      profilePicture
    }
    locationReview {
      id
      ...GuestReview_locationReview
    }
    hostReview {
      id
      ...GuestReview_hostReview
    }
    guestReview {
      id
      ...GuestReview_guestReview
    }
  }
`);

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables
> = gql`
  mutation SubmitGuestReview($bookingId: ID!, $guestReview: ReviewInput!) {
    submitGuestReview(bookingId: $bookingId, guestReview: $guestReview) {
      success
      message
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export function PastBooking({ booking }: PastBookingProps) {
  const hasHostReview = booking.guestReview !== null;
  const toast = useToast();

  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    onCompleted: (data) => {
      data.submitGuestReview.success
        ? toast({
            title: "Your review has been submitted.",
            description: "Thank you!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        : toast({
            title: "Something went wrong.",
            description: "Try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
    },
  });

  return (
    <OuterContainer p={2}>
      <InnerContainer>
        <VStack>
          <Image
            isAvatar
            src={booking.guest.profilePicture}
            w="200px"
            h="auto"
            alt={booking.guest.name}
          />
          <Content
            title={booking.guest.name}
            checkInDate={booking.checkInDate}
            checkOutDate={booking.checkOutDate}
            hasReviews={hasHostReview}
          >
            {booking.status === "CURRENT" ? (
              <Box w="max-content">
                <Text fontWeight="semibold" fontStyle="italic">
                  Current guest
                </Text>
              </Box>
            ) : null}
          </Content>
        </VStack>
        <GuestReview
          locationReview={booking.locationReview}
          hostReview={booking.hostReview}
          guestReview={booking.guestReview}
          onSubmitReview={(review) => {
            submitReview({
              variables: {
                guestReview: review,
                bookingId: booking.id,
              },
              // NOTE: for the scope of this project, we've opted for the simpler refetch approach
              // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
              // refetchQueries: [
              //   {
              //     query: HOST_BOOKINGS,
              //     variables: {
              //       listingId: booking.listing.id,
              //       status: "COMPLETED",
              //     },
              //   },
              // ],
            });
          }}
        />
      </InnerContainer>
    </OuterContainer>
  );
}
