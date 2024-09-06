import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables,
} from "./__generated__/bookings.types";
import { BookingStatus } from "../__generated__/types";
import { ListingList } from "../components/ListingList";
import { Booking } from "../components/Booking";

export const HOST_BOOKINGS: TypedDocumentNode<
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables
> = gql`
  query GetCurrrentAndUpcomingBookingsForHostListing(
    $listingId: ID!
    $upcomingStatus: BookingStatus
    $currentStatus: BookingStatus
  ) {
    upcomingBookings: bookingsForListing(
      listingId: $listingId
      status: $upcomingStatus
    ) {
      id
      checkInDate
      checkOutDate
      status
      guest {
        id
        profilePicture
        name
      }
    }

    currentBooking: bookingsForListing(
      listingId: $listingId
      status: $currentStatus
    ) {
      id
      checkInDate
      checkOutDate
      status
      guest {
        id
        profilePicture
        name
      }
    }
  }
`;

export default function HostBookings() {
  const { id } = useParams();
  const { data } = useSuspenseQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id!,
      upcomingStatus: BookingStatus.UPCOMING,
      currentStatus: BookingStatus.CURRENT,
    },
  });

  const { upcomingBookings, currentBooking } = data;
  const bookings = [...upcomingBookings, ...currentBooking];

  return bookings.length ? (
    <ListingList>
      {bookings.filter(Boolean).map((booking) => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </ListingList>
  ) : (
    <Text textAlign="center">You have no current or upcoming bookings</Text>
  );
}
