import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

interface FeaturedListingContainerProps {
  children: ReactNode;
}

export function FeaturedListingContainer({
  children,
}: FeaturedListingContainerProps) {
  return (
    <Container maxW="container.xl" mb={24} p={12} pt={8}>
      {children}
    </Container>
  );
}
