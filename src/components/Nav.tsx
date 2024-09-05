import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/airlock-logo.svg";

interface NavProps {
  user: { __typename: "Host" | "Guest"; profilePicture: string } | undefined;
}

export function Nav({ user }: NavProps) {
  const location = useLocation();

  return (
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
              {user.__typename === "Guest" && (
                <Button as={NavLink} to="/trips" variant="ghost">
                  My trips
                </Button>
              )}
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
  );
}
