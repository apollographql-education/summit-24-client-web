import { Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FeaturedListingTitleProps {
  children: ReactNode;
}

export function FeaturedListingTitle({ children }: FeaturedListingTitleProps) {
  return (
    <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6}>
      {children}
    </Heading>
  );
}
