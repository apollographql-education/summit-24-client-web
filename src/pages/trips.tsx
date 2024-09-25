import { Box, Heading, Link } from "@chakra-ui/react";
import { Outlet, Link as RouterLink, useMatch } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";

export function Trips() {
  const upcomingTripsMatch = useMatch("/trips");
  const pastTripsMatch = useMatch("/trips/past");

  return (
    <PageContainer>
      <Heading as="h1" mb="4">
        My trips
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
          to="/trips"
          mr="8"
          fontWeight={upcomingTripsMatch ? "bold" : "normal"}
          color={upcomingTripsMatch ? "indigo.dark" : "gray.dark"}
        >
          Upcoming
        </Link>
        <Link
          as={RouterLink}
          to="past"
          fontWeight={pastTripsMatch ? "bold" : "normal"}
          color={pastTripsMatch ? "indigo.dark" : "gray.dark"}
        >
          Past trips
        </Link>
      </Box>
      <Outlet />
    </PageContainer>
  );
}
