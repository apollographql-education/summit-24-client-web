import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router-dom";
import { Center } from "@chakra-ui/react";
import {
  GetBookingQuery,
  GetBookingQueryVariables,
} from "./__generated__/host-listings.types";
import { PageContainer } from "../components/PageContainer";
import { HostBookingsNav } from "../components/HostBookingsNav";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";

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

export default function HostListings() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_BOOKING, {
    variables: { listingId: id! },
  });

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  if (!data?.listing) {
    return <Center>Listing could not be found</Center>;
  }

  return (
    <PageContainer>
      <HostBookingsNav title={data.listing.title} />
      <Outlet />
    </PageContainer>
  );
}
