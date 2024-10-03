import { gql, useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { GetFeaturedListingsFromCacheQuery } from "./__generated__/InflationButton.types";
// Use this type to provide type safety for cache.modify
// import type { Listing } from "../__generated__/types";

/* Exercise 2
 *
 * Docs on cache.readQuery:
 * https://www.apollographql.com/docs/react/caching/cache-interaction#readquery
 *
 * Docs on cache.identify:
 * https://www.apollographql.com/docs/react/caching/cache-interaction#obtaining-an-objects-cache-id
 *
 * Docs on cache.modify:
 * https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachemodify
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
        const data = cache.readQuery<GetFeaturedListingsFromCacheQuery>({
          query: gql`
            query GetFeaturedListingsFromCache {
              featuredListings {
                id
              }
            }
          `,
        });

        // Follow-along: object identification
        // if (data) {
        //   const listing = data.featuredListings[0];
        //   const id = cache.identify();
        //   console.log("cacheId", id);
        // }

        // Follow-along: cache modification
        // cache.modify({})

        // Exercise:
        // Modify each featuredListings's costPerNight when this
        // button is cliecked. Use the code below as a starter.
        //
        // if (data) {
        //   data.featuredListings.forEach((listing) => {
        //     // TODO: Implement cache modification here for exercise 2
        //   });
        // }
      }}
    >
      $$$ Inflate costs $$$
    </Button>
  );
}
