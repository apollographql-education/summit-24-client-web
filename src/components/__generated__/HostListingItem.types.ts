import * as GraphQLTypes from "../../__generated__/types";

export type HostListingItem_listingFragment = {
  __typename: "Listing";
  id: string;
  title: string;
  photoThumbnail: string;
  numberOfUpcomingBookings: number;
  overallRating: number | null;
};
