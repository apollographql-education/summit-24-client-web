import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetPastTripsQuery,
  GetPastTripsQueryVariables,
} from "./__generated__/past-trips.types";
import { preloadQuery } from "../apollo/preloadQuery";
import { useLoaderData } from "react-router-dom";
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

export function loader() {
  return preloadQuery(PAST_GUEST_TRIPS).toPromise();
}

export default function PastTrips() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { pastGuestBookings } = data;

  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {pastGuestBookings.filter(Boolean).map((trip) => (
        <PastTrip key={trip.id} trip={trip} />
      ))}
    </VStack>
  );
}
