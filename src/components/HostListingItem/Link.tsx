import { Link } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface HostListingItemLinkProps {
  to: string;
  children: ReactNode;
}

export function HostListingItemLink({
  children,
  to,
}: HostListingItemLinkProps) {
  return (
    <Link
      as={RouterLink}
      mr="4"
      color="indigo.dark"
      fontWeight="semibold"
      _hover={{
        textDecoration: "underline",
      }}
      to={to}
    >
      {children}
    </Link>
  );
}
