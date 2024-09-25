import { HStack, Spinner } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { NavAvatar } from "./NavAvatar";
import { GuestNav } from "./GuestNav";
import { HostNav } from "./HostNav";
import { LoginButton } from "./LoginButton";
import { NavContainer } from "./NavContainer";

interface NavProps {
  user: { __typename: "Host" | "Guest"; profilePicture: string } | undefined;
  loading?: boolean;
}

export function Nav({ user, loading }: NavProps) {
  return (
    <NavContainer>
      <Logo />
      <HStack spacing="2">
        {user ? (
          <>
            {user.__typename === "Guest" && <GuestNav />}
            {user.__typename === "Host" && <HostNav />}
            <NavAvatar src={user.profilePicture} />
          </>
        ) : loading ? (
          <Spinner />
        ) : (
          <LoginButton />
        )}
      </HStack>
    </NavContainer>
  );
}
