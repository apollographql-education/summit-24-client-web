import { gql, useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { GetFeaturedListingsFromCacheQuery } from "./__generated__/InflationButton.types";
import type { Listing } from "../__generated__/types";

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

        if (data) {
          data.featuredListings.forEach((listing) => {
            cache.modify<Listing>({
              id: cache.identify(listing),
              fields: {
                costPerNight: (cost) => Math.floor(cost * 1.25),
              },
            });
          });
        }
      }}
    >
      $$$ Inflate costs $$$
    </Button>
  );
}
