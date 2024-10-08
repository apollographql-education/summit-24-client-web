import { Box, useToast, Text, VStack } from "@chakra-ui/react";
import { Content, Image } from "./Card";
import { GuestReview } from "./TripReviews";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import {
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables,
} from "./__generated__/PastBooking.types";
import { Card } from "./Card/Card";
import { BookingStatus } from "../__generated__/types";

interface PastBookingProps {
  booking: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: BookingStatus;
    guest: {
      __typename: "Guest";
      id: string;
      name: string;
      profilePicture: string;
    };
    locationReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    hostReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    guestReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
  };
}

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
    <Card>
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
          });
        }}
      />
    </Card>
  );
}
