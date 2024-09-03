import Logo from "../assets/airlock-logo.svg";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/Layout.types";
import { preloadQuery } from "../apolloClient";
import { Suspense } from "react";
import { PageSpinner } from "../components/PageSpinner";
import { GuestNav } from "../components/GuestNav";

export const GET_USER: TypedDocumentNode<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
> = gql`
  query GetMyProfile {
    me {
      id
      profilePicture
      ... on Guest {
        ...GuestNav_guest @nonreactive
      }
    }
  }
`;

export function loader() {
  return preloadQuery(GET_USER, { errorPolicy: "ignore" });
}

export function Layout() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const location = useLocation();
  const navigation = useNavigation();
  const { data } = useReadQuery(queryRef);

  const loading = navigation.state === "loading";
  const user = data?.me;

  return (
    <>
      {loading && (
        <Center
          h="100vh"
          w="100vw"
          position="fixed"
          left={0}
          top={0}
          zIndex={-1}
        >
          <Spinner size="xl" />
        </Center>
      )}
      <Box px="2" h="80px" bgColor="white">
        <Flex direction="row" justify="space-between" align="center" p={4}>
          <Box as={Link} to="/">
            <HStack spacing="2">
              <Image
                boxSize="50px"
                objectFit="cover"
                src={Logo}
                alt="airlock logo"
              />
              <Text
                fontWeight="600"
                fontSize="2xl"
                textTransform="uppercase"
                fontFamily="Source Sans Pro"
                letterSpacing="1.4px"
              >
                Airlock
              </Text>
            </HStack>
          </Box>
          <HStack spacing="2">
            {user ? (
              <>
                {user.__typename === "Guest" && <GuestNav guest={user} />}
                {user.__typename === "Host" && (
                  <Button as={NavLink} to="/listings" variant="ghost">
                    My listings
                  </Button>
                )}
                <Box as={Link} to="/profile">
                  <Avatar
                    name="profile"
                    borderColor="white"
                    bg="gray.50"
                    borderWidth="1px"
                    src={user.profilePicture}
                  />
                </Box>
              </>
            ) : location.pathname !== "/login" ? (
              <Button as={NavLink} to="/login">
                Log in
              </Button>
            ) : null}
          </HStack>
        </Flex>
      </Box>

      <Suspense fallback={<PageSpinner />}>
        <Box opacity={loading ? 0.5 : 1} transition="0.15s opacity ease-out">
          <Outlet />
        </Box>
      </Suspense>
    </>
  );
}
