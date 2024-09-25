import { Button } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

export function LoginButton() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

  return (
    <Button as={Link} to="/login">
      Log in
    </Button>
  );
}
