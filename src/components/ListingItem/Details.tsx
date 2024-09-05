import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListingItemDetailsProps {
  children: ReactNode;
}

export function ListingItemDetails({ children }: ListingItemDetailsProps) {
  return (
    <Flex
      direction="column"
      ml={6}
      justify="space-around"
      minH="120px"
      width="100%"
      sx={{ gap: "24px" }}
    >
      {children}
    </Flex>
  );
}
