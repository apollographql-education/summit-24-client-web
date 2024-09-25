import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  GetPastTripsQuery,
  GetPastTripsQueryVariables,
} from "./__generated__/past-trips.types";
import { StackDivider, VStack } from "@chakra-ui/react";
import { PastTrip } from "../components/PastTrip";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";

export const PAST_GUEST_TRIPS: TypedDocumentNode<
  GetPastTripsQuery,
  GetPastTripsQueryVariables
> = gql`
  query GetPastTrips {
    pastGuestBookings {
      id
      checkInDate
      checkOutDate
      listing {
        id
        photoThumbnail
        title
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

export function PastTrips() {
  const { data, loading, error } = useQuery(PAST_GUEST_TRIPS);
  const pastGuestBookings = data?.pastGuestBookings ?? [];

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {pastGuestBookings.filter(Boolean).map((trip) => (
        <PastTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
