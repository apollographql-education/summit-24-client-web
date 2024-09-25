import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function GuestNav() {
  return (
    <Button as={Link} to="/trips" variant="ghost">
      My trips
    </Button>
  );
}
