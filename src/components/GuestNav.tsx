import { Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface GuestNavProps {
  user: { __typename: "Guest"; funds?: number };
}

export function GuestNav({ user }: GuestNavProps) {
  return (
    <>
      {"funds" in user && typeof user.funds !== "undefined" && (
        <Box fontWeight="bold">Funds: ¤{user.funds}</Box>
      )}
      <Button as={Link} to="/trips" variant="ghost">
        My trips
      </Button>
    </>
  );
}
