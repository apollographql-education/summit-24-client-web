import { UpcomingTrip } from "../components/UpcomingTrip";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { StackDivider, VStack } from "@chakra-ui/react";
import {
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables,
} from "./__generated__/upcoming-trips.types";

export const GUEST_TRIPS: TypedDocumentNode<
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables
> = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      id
      checkInDate
      checkOutDate
      status
      listing {
        id
        photoThumbnail
        title
      }
    }
  }
`;

export function UpcomingTrips() {
  const { data } = useSuspenseQuery(GUEST_TRIPS);

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {data.upcomingGuestBookings.filter(Boolean).map((trip) => (
        <UpcomingTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
