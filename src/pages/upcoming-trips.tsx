import { UpcomingTrip } from "../components/UpcomingTrip";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables,
} from "./__generated__/trips.types";
import { preloadQuery } from "../apollo/preloadQuery";
import { useLoaderData } from "react-router-dom";
import { StackDivider, VStack } from "@chakra-ui/react";

export const GUEST_TRIPS: TypedDocumentNode<
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables
> = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      id
      ...UpcomingTrip_trip
    }
  }
`;

export function loader() {
  return preloadQuery(GUEST_TRIPS).toPromise();
}

export default function UpcomingTrips() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { upcomingGuestBookings } = data;

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {upcomingGuestBookings.filter(Boolean).map((trip) => (
        <UpcomingTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
