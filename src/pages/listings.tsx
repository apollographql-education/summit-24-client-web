import Stars from "../components/Stars";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link, useLoaderData } from "react-router-dom";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetHostListingsQuery,
  GetHostListingsQueryVariables,
} from "./__generated__/listings.types";
import { preloadQuery } from "../apolloClient";
import { PageContainer } from "../components/PageContainer";

const LINK_PROPS = {
  as: Link,
  mr: "4",
  color: "indigo.dark",
  fontWeight: "semibold",
  _hover: {
    textDecoration: "underline",
  },
};

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

export function loader() {
  return preloadQuery(HOST_LISTINGS);
}

export default function Listings() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { hostListings } = data;

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
          return (
            <Box key={listing.id} overflow="hidden" w="full">
              <Flex direction="row" flexWrap="wrap">
                <Image
                  src={listing.photoThumbnail}
                  alt={listing.title}
                  objectFit="cover"
                  w="250px"
                  h="140px"
                  borderRadius={4}
                />
                <Flex direction="column" px="4">
                  <Flex direction="column" h="full">
                    <Heading as="h2" size="md">
                      {listing.title}
                    </Heading>
                    <Flex flexWrap="wrap" mt={4}>
                      <Text mr={4}>
                        {listing.numberOfUpcomingBookings} bookings
                      </Text>
                      {listing.overallRating ? (
                        <Stars size={20} rating={listing.overallRating} />
                      ) : (
                        <Text>No reviews yet</Text>
                      )}
                    </Flex>
                  </Flex>
                  <Flex>
                    <Box {...LINK_PROPS} to={`/listing/${listing.id}/edit`}>
                      Edit
                    </Box>
                    <Box {...LINK_PROPS} to={`/listing/${listing.id}`}>
                      View
                    </Box>
                    <Box {...LINK_PROPS} to={`/listing/${listing.id}/bookings`}>
                      Manage Bookings
                    </Box>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </VStack>
    </PageContainer>
  );
}
