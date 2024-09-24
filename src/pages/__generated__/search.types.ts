import * as GraphQLTypes from "../../__generated__/types";

export type SearchListingsQueryVariables = GraphQLTypes.Exact<{
  searchListingsInput: GraphQLTypes.SearchListingsInput;
}>;

export type SearchListingsQuery = {
  searchListings: Array<{
    __typename: "Listing";
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    overallRating: number | null;
    locationType: GraphQLTypes.LocationType;
  } | null>;
};
