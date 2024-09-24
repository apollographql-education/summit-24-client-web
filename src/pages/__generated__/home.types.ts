import * as GraphQLTypes from "../../__generated__/types";

export type GetFeaturedListingsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetFeaturedListingsQuery = {
  featuredListings: Array<{
    __typename: "Listing";
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    overallRating: number | null;
    locationType: GraphQLTypes.LocationType;
  }>;
};
