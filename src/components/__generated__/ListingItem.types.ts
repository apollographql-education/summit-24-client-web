import * as GraphQLTypes from "../../__generated__/types";

export type ListingItem_listingFragment = {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  photoThumbnail: string;
  numOfBeds: number;
  costPerNight: number;
  overallRating: number | null;
  locationType: GraphQLTypes.LocationType;
};
