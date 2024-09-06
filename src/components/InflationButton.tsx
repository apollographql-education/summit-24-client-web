import { gql, useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import {
  GetFeaturedListingsForInflationQuery,
  GetFeaturedListingsForInflationQueryVariables,
} from "./__generated__/InflationButton.types";

export function InflationButton() {
  const { cache } = useApolloClient();

  return (
    <Button
      position="fixed"
      bottom="2rem"
      right="2rem"
      size="lg"
      onClick={() => {
        const data = cache.readQuery<
          GetFeaturedListingsForInflationQuery,
          GetFeaturedListingsForInflationQueryVariables
        >({
          query: gql`
            query GetFeaturedListingsForInflation {
              featuredListings {
                id
              }
            }
          `,
        });

        if (data) {
          data.featuredListings.filter(Boolean).forEach((listing) => {
            cache.modify({
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
