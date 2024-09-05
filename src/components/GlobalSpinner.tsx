import { Center, Spinner } from "@chakra-ui/react";

export function GlobalSpinner() {
  return (
    <Center position="fixed" top="0" left="0" zIndex={-1} w="100vw" h="100vh">
      <Spinner size="xl" />
    </Center>
  );
}
