import { Button, Flex, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetHostListingsQuery,
  GetHostListingsQueryVariables,
} from "./__generated__/listings.types";
import { PageContainer } from "../components/PageContainer";
import { HostListingItem } from "../components/HostListingItem";

export const HOST_LISTINGS: TypedDocumentNode<
  GetHostListingsQuery,
  GetHostListingsQueryVariables
> = gql`
  query GetHostListings {
    hostListings {
      id
      ...HostListingItem_listing
    }
  }

  ${HostListingItem.fragments.listing}
`;

export function Listings() {
  const { data } = useSuspenseQuery(HOST_LISTINGS);

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
        {data.hostListings.filter(Boolean).map((listing) => {
          return <HostListingItem key={listing.id} listing={listing} />;
        })}
      </VStack>
    </PageContainer>
  );
}
