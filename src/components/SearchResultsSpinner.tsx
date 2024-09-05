import { Center, Spinner } from "@chakra-ui/react";

export function SearchResultsSpinner() {
  return (
    <Center minH="20rem">
      <Spinner size="lg" />
    </Center>
  );
}
