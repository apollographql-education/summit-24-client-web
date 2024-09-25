import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { HStack } from "@chakra-ui/react";
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
import { preloadQuery } from "../apollo/preloadQuery";

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

/* Exercise 8
 *
 * Go to src/apollo/preloadQuery.ts to create a preloadQuery function.

 * Docs on creating a query preloader function:
 * https://www.apollographql.com/docs/react/data/suspense#initiating-queries-outside-react
 *
 */

const queryRef = preloadQuery(GET_PROFILE, { errorPolicy: "ignore" });

export function Nav() {
  const { data } = useReadQuery(queryRef);
  const user = data?.me;

  return (
    <NavContainer>
      <Logo />
      <HStack spacing="2">
        {user ? (
          <>
            {user.__typename === "Guest" && <GuestNav user={user} />}
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
