import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetPastTripsQuery,
  GetPastTripsQueryVariables,
} from "./__generated__/past-trips.types";
import { StackDivider, VStack } from "@chakra-ui/react";
import { PastTrip } from "../components/PastTrip";

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
  const { data } = useSuspenseQuery(PAST_GUEST_TRIPS);

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {data.pastGuestBookings.filter(Boolean).map((trip) => (
        <PastTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
