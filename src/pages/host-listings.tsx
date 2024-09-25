import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router-dom";
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

export function HostListings() {
  const { id } = useParams();

  const { data } = useSuspenseQuery(GET_BOOKING, {
    variables: { listingId: id! },
  });

  if (!data.listing) {
    return <Center>Listing could not be found</Center>;
  }

  return (
    <PageContainer>
      <HostBookingsNav title={data.listing.title} />
      <Outlet />
    </PageContainer>
  );
}
