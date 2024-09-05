import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  GetCurrrentAndUpcomingBookingsForHostListingQuery,
  GetCurrrentAndUpcomingBookingsForHostListingQueryVariables,
} from "./__generated__/bookings.types";
import { BookingStatus } from "../__generated__/types";
import { preloadQuery } from "../apollo/preloadQuery";
import { ListingList } from "../components/ListingList";
import { Booking } from "../components/Bookings";

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
      ...Booking_booking
    }

    currentBooking: bookingsForListing(
      listingId: $listingId
      status: $currentStatus
    ) {
      id
      ...Booking_booking
    }
  }
`;

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Invalid booking ID");
  }

  return preloadQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id,
      upcomingStatus: BookingStatus.UPCOMING,
      currentStatus: BookingStatus.CURRENT,
    },
  }).toPromise();
}

export default function HostBookings() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  const { upcomingBookings, currentBooking } = data;
  const bookings = [...upcomingBookings, ...currentBooking];

  return bookings.length ? (
    <ListingList>
      {bookings.filter(Boolean).map((booking) => {
        return <Booking key={booking.id} booking={booking} />;
      })}
    </ListingList>
  ) : (
    <Text textAlign="center">You have no current or upcoming bookings</Text>
  );
}
