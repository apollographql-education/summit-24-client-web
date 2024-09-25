import { Avatar, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface NavAvatarProps {
  src: string;
}

export function NavAvatar({ src }: NavAvatarProps) {
  return (
    <Box as={Link} to="/profile">
      <Avatar
        name="profile"
        borderColor="white"
        bg="gray.50"
        borderWidth="1px"
        src={src}
      />
    </Box>
  );
}
