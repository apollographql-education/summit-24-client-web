import { Button } from "@chakra-ui/react";
import { IoExit } from "react-icons/io5";
import { Link } from "react-router-dom";

export function LogoutButton() {
  return (
    <Button
      as={Link}
      to="/login"
      onClick={async (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        window.location.pathname = "/login";
      }}
      rightIcon={<IoExit />}
      variant="outline"
    >
      Logout
    </Button>
  );
}
