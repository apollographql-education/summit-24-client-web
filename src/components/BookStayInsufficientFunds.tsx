import { Box, Button, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BookStayContainer } from "./BookStayContainer";

interface BookStayInsufficientFundsProps {
  message: string | undefined;
}

export function BookStayInsufficientFunds({
  message,
}: BookStayInsufficientFundsProps) {
  return (
    <BookStayContainer title="Oh no! Booking incomplete.">
      <Box p="2">
        <Text>{message}</Text>
        <Button as={RouterLink} to="/wallet" colorScheme="blue" w="full" mt="4">
          Add funds
        </Button>
        <Link
          as="button"
          mt="2"
          alignSelf="center"
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
