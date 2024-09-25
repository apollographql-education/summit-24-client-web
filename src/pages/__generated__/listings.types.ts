import * as GraphQLTypes from "../../__generated__/types";

export type GetHostListingsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetHostListingsQuery = {
  hostListings: Array<{
    __typename: "Listing";
    id: string;
    title: string;
    photoThumbnail: string;
    numberOfUpcomingBookings: number;
    overallRating: number | null;
  } | null>;
};
