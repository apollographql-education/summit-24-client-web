import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables,
} from "./__generated__/past-bookings.types";
import { BookingStatus } from "../__generated__/types";
import { preloadQuery } from "../apollo/preloadQuery";
import { StackDivider, Text, VStack } from "@chakra-ui/react";
import { PastBooking } from "../components/PastBooking";

export const HOST_BOOKINGS: TypedDocumentNode<
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables
> = gql`
  query GetPastBookingsForHostListing($listingId: ID!, $status: BookingStatus) {
    bookingsForListing(listingId: $listingId, status: $status) {
      id
      ...PastBooking_booking
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
      status: BookingStatus.COMPLETED,
    },
  }).toPromise();
}

export default function HostBookings() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  const bookings = data.bookingsForListing.filter(Boolean);

  return bookings.length ? (
    <VStack spacing="4" divider={<StackDivider />}>
      {bookings.map((booking) => {
        return <PastBooking key={booking.id} booking={booking} />;
      })}
    </VStack>
  ) : (
    <Text textAlign="center">You have no previous bookings</Text>
  );
}
