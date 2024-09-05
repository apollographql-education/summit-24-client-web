import { Center, Heading } from "@chakra-ui/react";

export function SearchResultsEmpty() {
  return (
    <Center my={20}>
      <Heading size="lg">No results found</Heading>
    </Center>
  );
}
