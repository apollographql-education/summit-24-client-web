import { gql, useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import { GetFeaturedListingsFromCacheQuery } from "./__generated__/InflationButton.types";
import type { Listing } from "../__generated__/types";

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
