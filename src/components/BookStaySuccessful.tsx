import { Box, Button, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BookStayContainer } from "./BookStayContainer";

interface BookStaySuccessfulProps {
  checkInDate: string;
  checkOutDate: string;
}

export function BookStaySuccessful({
  checkInDate,
  checkOutDate,
}: BookStaySuccessfulProps) {
  return (
    <BookStayContainer title="Booking successful!">
      <Box p="2" textAlign="center">
        <Text>You&apos;re staying here on</Text>
        <Text fontWeight="semibold">
          {checkInDate} - {checkOutDate}
        </Text>
        <Button
          as={RouterLink}
          to="/trips" // TODO: route to specific trip (need to add functionality to trips to view trip details)
          colorScheme="blue"
          w="full"
          mt="2"
        >
          Review booking
        </Button>
        <Link
          as="button"
          mt="2"
          textDecoration="underline"
          _hover={{
            textDecoration: "none",
          }}
          onClick={() => window.location.reload()}
        >
          Book new dates
        </Link>
      </Box>
    </BookStayContainer>
  );
}
