import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { preloadQuery } from "../apollo/preloadQuery";
import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import {
  GetBookingQuery,
  GetBookingQueryVariables,
} from "./__generated__/host-listings.types";
import { PageContainer } from "../components/PageContainer";
import { HostBookingsNav } from "../components/HostBookingsNav";

const GET_BOOKING: TypedDocumentNode<
  GetBookingQuery,
  GetBookingQueryVariables
> = gql`
  query GetBooking($listingId: ID!) {
    listing(id: $listingId) {
      id
      title
    }
  }
`;

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Invalid ID");
  }

  return preloadQuery(GET_BOOKING, { variables: { listingId: id } });
}

export default function HostListings() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  const { listing } = data;

  if (!listing) {
    return <Center>Listing could not be found</Center>;
  }

  return (
    <PageContainer>
      <HostBookingsNav title={listing.title} />
      <Outlet />
    </PageContainer>
  );
}
