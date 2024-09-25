import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables,
} from "./__generated__/past-bookings.types";
import { BookingStatus } from "../__generated__/types";
import { Text } from "@chakra-ui/react";
import { PastBooking } from "../components/PastBooking";
import { ListingList } from "../components/ListingList";
import { useParams } from "react-router-dom";
import { PageSpinner } from "../components/PageSpinner";

export const HOST_BOOKINGS: TypedDocumentNode<
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables
> = gql`
  query GetPastBookingsForHostListing($listingId: ID!, $status: BookingStatus) {
    bookingsForListing(listingId: $listingId, status: $status) {
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
        rating
        text
      }
      hostReview {
        id
        rating
        text
      }
      guestReview {
        id
        rating
        text
      }
    }
  }
`;

export function HostPastBookings() {
  const { id } = useParams();
  const { data, loading } = useQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id!,
      status: BookingStatus.COMPLETED,
    },
  });

  const bookings = data?.bookingsForListing.filter(Boolean) ?? [];

  if (loading) {
    return <PageSpinner />;
  }

  return bookings.length ? (
    <ListingList>
      {bookings.map((booking) => (
        <PastBooking key={booking.id} booking={booking} />
      ))}
    </ListingList>
  ) : (
    <Text textAlign="center">You have no previous bookings</Text>
  );
}
