import { Container, HStack, Heading, Spacer, Stack } from "@chakra-ui/react";

import { gql, useApolloClient } from "@apollo/client";
import { LoginQuery } from "./__generated__/login.types";
import { HostLoginCard } from "../components/HostLoginCard";
import { GuestLoginCard } from "../components/GuestLoginCard";
import { OtherLoginOptions } from "../components/OtherLoginOptions";

export default function Login() {
  const client = useApolloClient();

  const HOST_USER = "user-1";
  const GUEST_USER = "user-2";

  function login(userId: string, type: "Guest" | "Host") {
    localStorage.setItem("token", userId);

    client.writeQuery<LoginQuery>({
      query: gql`
        query LoginQuery {
          me {
            id
          }
        }
      `,
      data: { me: { __typename: type, id: userId } },
    });
  }

  return (
    <Container maxW="container.md">
      <Stack spacing={6} alignItems="center">
        <Heading as="h1" size="xl">
          Choose a user role
        </Heading>
        <HStack spacing={6}>
          <HostLoginCard onClickLogin={() => login(HOST_USER, "Host")} />
          <GuestLoginCard onClickLogin={() => login(GUEST_USER, "Guest")} />
        </HStack>
        <Spacer mt={16} />
        <OtherLoginOptions onClickLogin={login} />
      </Stack>
    </Container>
  );
}
