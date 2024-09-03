import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { preloadQuery } from "../apolloClient";
import {
  LoaderFunctionArgs,
  Outlet,
  Link as RouterLink,
  useLoaderData,
  useLocation,
} from "react-router-dom";
import { Box, Center, Flex, Heading, Link } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import {
  GetBookingQuery,
  GetBookingQueryVariables,
} from "./__generated__/Bookings.types";
import { PageContainer } from "../components/PageContainer";

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

export function BookingsLayout() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const { pathname } = useLocation();

  const { listing } = data;

  if (!listing) {
    return <Center>Listing could not be found</Center>;
  }

  return (
    <PageContainer>
      <Flex
        alignItems="center"
        mb="4"
        color="indigo.dark"
        fontWeight="semibold"
      >
        <IoChevronBack />
        <Link as={RouterLink} to={"/listings"} fontWeight="semibold">
          Back to listings
        </Link>
      </Flex>
      <Heading as="h1" mb={4}>
        {listing.title}
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to={`/listing/${listing.id}/bookings`}
          mr="8"
          fontWeight={
            pathname === `/listing/${listing.id}/bookings` ? "bold" : "normal"
          }
          color={
            pathname === `/listing/${listing.id}/bookings`
              ? "indigo.dark"
              : "gray.dark"
          }
        >
          Upcoming Bookings
        </Link>
        <Link
          as={RouterLink}
          to={`/listing/${listing.id}/past-bookings`}
          fontWeight={
            pathname === `/listing/${listing.id}/past-bookings`
              ? "bold"
              : "normal"
          }
          color={
            pathname === `/listing/${listing.id}/past-bookings`
              ? "indigo.dark"
              : "gray.dark"
          }
        >
          Past Bookings
        </Link>
      </Box>
      <Outlet />
    </PageContainer>
  );
}
