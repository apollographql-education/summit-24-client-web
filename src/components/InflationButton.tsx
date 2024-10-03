import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";

/* Exercise 1
 *
 * Docs on cache.readQuery:
 * https://www.apollographql.com/docs/react/caching/cache-interaction#readquery
 */

export function InflationButton() {
  const { cache } = useApolloClient();

  return (
    <Button
      position="fixed"
      bottom="2rem"
      right="2rem"
      size="lg"
      onClick={() => {
        // const data = cache.readQuery({})
        // console.log(data)
      }}
    >
      $$$ Inflate costs $$$
    </Button>
  );
}
