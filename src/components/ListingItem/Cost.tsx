import { gql, useFragment, TypedDocumentNode } from "@apollo/client";
import { Flex, Text } from "@chakra-ui/react";
import { ListingItemCost_listingFragment } from "./__generated__/Cost.types";

interface ListingItemCostProps {
  listing: ListingItemCost_listingFragment;
}

/* Exercise 3
 *
 * Docs for useFragment:
 * https://www.apollographql.com/docs/react/data/fragments#useFragment
 *
 * Docs on @nonreactive:
 * https://www.apollographql.com/docs/react/data/directives#nonreactive
 */
export function ListingItemCost({ listing }: ListingItemCostProps) {
  const { data, complete } = useFragment({
    fragment: ListingItemCost.fragments.listing,
    from: listing,
  });

  if (!complete) {
    return null;
  }

  return (
    <Flex fontSize="lg" ml={6}>
      <Text fontWeight="bold"> ¤ {data.costPerNight}</Text> / night
    </Flex>
  );
}

ListingItemCost.fragments = {
  listing: gql`
    fragment ListingItemCost_listing on Listing {
      id
      costPerNight
    }
  ` as TypedDocumentNode<ListingItemCost_listingFragment>,
};
