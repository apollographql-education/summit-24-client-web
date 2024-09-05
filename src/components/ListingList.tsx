import { StackDivider, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ListingListProps {
  children: ReactNode;
}

export function ListingList({ children }: ListingListProps) {
  return (
    <VStack spacing="6" divider={<StackDivider />}>
      {children}
    </VStack>
  );
}
