import CurrentTrips from "../components/Trips";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables,
} from "./__generated__/trips.types";
import { preloadQuery } from "../apolloClient";
import { useLoaderData } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

export const GUEST_TRIPS: TypedDocumentNode<
  GetGuestTripsQuery,
  GetGuestTripsQueryVariables
> = gql`
  query GetGuestTrips {
    upcomingGuestBookings {
      id
      ...Trip_trip
    }
  }
`;

export function loader() {
  return preloadQuery(GUEST_TRIPS).toPromise();
}

export default function Trips() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { upcomingGuestBookings } = data;

  return (
    <PageContainer>
      <CurrentTrips trips={upcomingGuestBookings.filter(Boolean)} />
    </PageContainer>
  );
}
