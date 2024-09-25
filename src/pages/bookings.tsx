import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables,
} from "./__generated__/bookings.types";
import { BookingStatus } from "../__generated__/types";
import { ListingList } from "../components/ListingList";
import { Booking } from "../components/Booking";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";

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

export function HostBookings() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id!,
      upcomingStatus: BookingStatus.UPCOMING,
      currentStatus: BookingStatus.CURRENT,
    },
  });

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  const upcomingBookings = data?.upcomingBookings ?? [];
  const currentBooking = data?.currentBooking ?? [];
  const bookings = [...upcomingBookings, ...currentBooking].filter(Boolean);

  return bookings.length ? (
    <ListingList>
      {bookings.map((booking) => (
        <Booking key={booking.id} booking={booking} />
      ))}
    </ListingList>
  ) : (
    <Text textAlign="center">You have no current or upcoming bookings</Text>
  );
}
