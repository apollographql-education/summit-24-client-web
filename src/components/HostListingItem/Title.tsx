import { Heading } from "@chakra-ui/react";

interface HostListingItemTitleProps {
  title: string;
}

export function HostListingItemTitle({ title }: HostListingItemTitleProps) {
  return (
    <Heading as="h2" size="md">
      {title}
    </Heading>
  );
}
