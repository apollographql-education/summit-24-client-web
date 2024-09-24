import { Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BookStayContainer } from "./BookStayContainer";

export function BookStayLoggedOut() {
  return (
    <BookStayContainer title="You must be logged in">
      <Stack spacing="4">
        <Text>
          You can&apos;t book a stay without being logged in as a guest.
        </Text>
        <Button as={Link} to="/login" colorScheme="blue" w="full" mt="2">
          Log in as Guest
        </Button>
      </Stack>
    </BookStayContainer>
  );
}
