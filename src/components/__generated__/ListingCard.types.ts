import * as GraphQLTypes from "../../__generated__/types";

export type ListingCard_listingFragment = {
  __typename: "Listing";
  id: string;
  title: string;
  photoThumbnail: string;
  numOfBeds: number;
  overallRating: number | null;
  locationType: GraphQLTypes.LocationType;
  costPerNight: number;
};
