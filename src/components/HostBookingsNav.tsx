import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { IoChevronBack } from "react-icons/io5";
import { Link as RouterLink, useMatch } from "react-router-dom";

interface HostBookingsNavProps {
  title: string;
}

export function HostBookingsNav({ title }: HostBookingsNavProps) {
  const bookingsMatch = useMatch("/listing/:id/bookings");
  const pastBookingsMatch = useMatch("/listing/:id/past-bookings");

  return (
    <>
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
        {title}
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
          to="bookings"
          mr="8"
          fontWeight={bookingsMatch ? "bold" : "normal"}
          color={bookingsMatch ? "indigo.dark" : "gray.dark"}
        >
          Upcoming Bookings
        </Link>
        <Link
          as={RouterLink}
          to="past-bookings"
          fontWeight={pastBookingsMatch ? "bold" : "normal"}
          color={pastBookingsMatch ? "indigo.dark" : "gray.dark"}
        >
          Past Bookings
        </Link>
      </Box>
    </>
  );
}
