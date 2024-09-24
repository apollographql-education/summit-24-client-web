import { Button, Flex, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  GetHostListingsQuery,
  GetHostListingsQueryVariables,
} from "./__generated__/listings.types";
import { PageContainer } from "../components/PageContainer";
import { PageError } from "../components/PageError";
import { PageSpinner } from "../components/PageSpinner";
import { HostListingItem } from "../components/HostListingItem";

export const HOST_LISTINGS: TypedDocumentNode<
  GetHostListingsQuery,
  GetHostListingsQueryVariables
> = gql`
  query GetHostListings {
    hostListings {
      id
      numberOfUpcomingBookings
      title
      photoThumbnail
      overallRating
    }
  }
`;

export default function Listings() {
  const { data, loading, error } = useQuery(HOST_LISTINGS);
  const hostListings = data?.hostListings ?? [];

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  return (
    <PageContainer>
      <Flex w="full" justifyContent="space-between">
        <Heading as="h1" mt={0} mb="4">
          My listings
        </Heading>
        <Button
          as={Link}
          to="/listings/create"
          leftIcon={<IoAddCircleOutline />}
        >
          Add
        </Button>
      </Flex>
      <VStack spacing="4" divider={<StackDivider borderColor="gray.200" />}>
        {hostListings.filter(Boolean).map((listing) => {
          return <HostListingItem key={listing.id} listing={listing} />;
        })}
      </VStack>
    </PageContainer>
  );
}
