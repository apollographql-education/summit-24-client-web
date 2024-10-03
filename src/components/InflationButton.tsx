import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";

export function InflationButton() {
  const { cache } = useApolloClient();

  return (
    <Button
      position="fixed"
      bottom="2rem"
      right="2rem"
      size="lg"
      onClick={() => {
        console.log(
          "Welcome to the workshop! Get started by checking out the `exercise-1-readQuery` branch.",
        );
      }}
    >
      $$$ Inflate costs $$$
    </Button>
  );
}
