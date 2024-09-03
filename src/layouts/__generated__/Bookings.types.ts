import * as GraphQLTypes from "../../__generated__/types";

export type GetBookingQueryVariables = GraphQLTypes.Exact<{
  listingId: GraphQLTypes.Scalars["ID"]["input"];
}>;

export type GetBookingQuery = {
  listing: { __typename: "Listing"; id: string; title: string } | null;
};
