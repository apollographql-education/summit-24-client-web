import * as GraphQLTypes from "../../__generated__/types";

export type GetFeaturedListingsFromCacheQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetFeaturedListingsFromCacheQuery = {
  featuredListings: Array<{ __typename: "Listing"; id: string }>;
};
