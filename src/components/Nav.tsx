import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import { Box, HStack } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavAvatar } from "./NavAvatar";
import { GuestNav } from "./GuestNav";
import { HostNav } from "./HostNav";
import { LoginButton } from "./LoginButton";
import { NavContainer } from "./NavContainer";
import {
  GetMyProfileQuery,
  GetMyProfileQueryVariables,
} from "./__generated__/Nav.types";

/* Exercise 2: Bonus
 *
 * Uncomment the GraphQL fields below and rerun the cache update in BookStay.tsx
 * to see how the change affects when the network request is executed.
 */
const GET_PROFILE: TypedDocumentNode<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
> = gql`
  query GetMyProfile {
    me {
      id
      profilePicture
      # ... on Guest {
      #   funds
      # }
    }
  }
`;

export function Nav() {
  const { data } = useQuery(GET_PROFILE, { errorPolicy: "ignore" });
  const user = data?.me;

  return (
    <NavContainer>
      <Logo />
      <HStack spacing="2">
        {user ? (
          <>
            {"funds" in user && typeof user.funds === "number" && (
              <Box fontWeight="bold">Funds: ¤{user.funds}</Box>
            )}
            {user.__typename === "Guest" && <GuestNav />}
            {user.__typename === "Host" && <HostNav />}
            <NavAvatar src={user.profilePicture} />
          </>
        ) : (
          <LoginButton />
        )}
      </HStack>
    </NavContainer>
  );
}
