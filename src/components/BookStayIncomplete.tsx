import { Button, Box, Text } from "@chakra-ui/react";
import { BookStayContainer } from "./BookStayContainer";

export function BookStayIncomplete() {
  return (
    <BookStayContainer title="Oh no! Booking incomplete.">
      <Box p="2">
        <Text>We couldn&apos;t complete your request.</Text>
        <Button
          colorScheme="blue"
          w="full"
          mt="2"
          onClick={() => window.location.reload()}
        >
          Book new dates
        </Button>
      </Box>
    </BookStayContainer>
  );
}
