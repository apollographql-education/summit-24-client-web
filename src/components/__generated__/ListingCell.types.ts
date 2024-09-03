import * as GraphQLTypes from "../../__generated__/types";

export type ListingCell_listingFragment = {
  __typename: "Listing";
  title: string;
  description: string;
  photoThumbnail: string;
  numOfBeds: number;
  costPerNight: number;
  overallRating: number | null;
  locationType: GraphQLTypes.LocationType;
};
