import { UpcomingTrip } from "../components/UpcomingTrip";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { StackDivider, VStack } from "@chakra-ui/react";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";
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

export default function UpcomingTrips() {
  const { data, loading, error } = useQuery(GUEST_TRIPS);
  const upcomingGuestBookings = data?.upcomingGuestBookings ?? [];

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {upcomingGuestBookings.filter(Boolean).map((trip) => (
        <UpcomingTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
