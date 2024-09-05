import {
  Box,
  StackDivider,
  Text,
  useToast,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { Content, Image, InnerContainer, OuterContainer } from "./Card";

import { HOST_BOOKINGS, SUBMIT_REVIEW } from "../pages/past-bookings";
import { GuestReview } from "./TripReviews";
import { gql, useMutation } from "@apollo/client";
import { fragments } from "../apollo/fragments";
import {
  Booking_bookingFragment,
  Bookings_bookingsFragment,
} from "./__generated__/Bookings.types";

interface BookingProps {
  booking: Booking_bookingFragment;
  isPast?: boolean;
}

fragments.register(gql`
  fragment Booking_booking on Booking {
    id
    checkInDate
    checkOutDate
    status
    listing {
      id
    }
    locationReview {
      id
      ...GuestReview_locationReview
    }
    hostReview {
      id
      ...GuestReview_hostReview
    }
    guest {
      id
      profilePicture
      name
    }
    guestReview {
      id
      ...GuestReview_guestReview
    }
  }
`);

function Booking({ booking, isPast }: BookingProps) {
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

  if (isPast) {
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
                refetchQueries: [
                  {
                    query: HOST_BOOKINGS,
                    variables: {
                      listingId: booking.listing.id,
                      status: "COMPLETED",
                    },
                  },
                ],
              });
            }}
          />
        </InnerContainer>
      </OuterContainer>
    );
  } else {
    return (
      <OuterContainer p={2}>
        <InnerContainer>
          <Wrap align="center" spacing="4">
            <Image
              isAvatar
              src={booking.guest.profilePicture}
              w="100px"
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
          </Wrap>
        </InnerContainer>
      </OuterContainer>
    );
  }
}

interface BookingsProps {
  bookings: Bookings_bookingsFragment[];
  isPast?: boolean;
}

fragments.register(gql`
  fragment Bookings_bookings on Booking {
    id
    ...Booking_booking
  }
`);

export default function Bookings({ bookings, isPast = false }: BookingsProps) {
  return bookings.length ? (
    <VStack spacing="4" divider={<StackDivider />}>
      {bookings.map((booking) => {
        return <Booking key={booking.id} booking={booking} isPast={isPast} />;
      })}
    </VStack>
  ) : (
    <Text textAlign="center">
      You have no {isPast ? "previous" : "current or upcoming"} bookings
    </Text>
  );
}
