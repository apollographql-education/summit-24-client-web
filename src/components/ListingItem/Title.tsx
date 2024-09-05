import { Heading } from "@chakra-ui/react";

interface ListingItemTitleProps {
  title: string;
}

export function ListingItemTitle({ title: children }: ListingItemTitleProps) {
  return (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  );
}
