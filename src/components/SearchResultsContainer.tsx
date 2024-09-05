import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface SearchResultsContainerProps {
  children: ReactNode;
}

export function SearchResultsContainer({
  children,
}: SearchResultsContainerProps) {
  return (
    <Stack mb="8" p={12} pt={9}>
      {children}
    </Stack>
  );
}
