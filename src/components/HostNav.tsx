import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function HostNav() {
  return (
    <Button as={Link} to="/listings" variant="ghost">
      My listings
    </Button>
  );
}
