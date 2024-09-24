import { Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BookStayContainer } from "./BookStayContainer";

export function BookStayAsHost() {
  return (
    <BookStayContainer title="Not bookable as Host">
      <Stack spacing="3">
        <Text>
          You can&apos;t book a listing while logged in as a host. To book this
          listing, please first logout and log back in as a guest.
        </Text>
        <Button as={Link} to="/login" colorScheme="blue" w="full" mt="2">
          Log in as Guest
        </Button>
      </Stack>
    </BookStayContainer>
  );
}
