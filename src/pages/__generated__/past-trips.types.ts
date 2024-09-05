import * as GraphQLTypes from "../../__generated__/types";

export type GetPastTripsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetPastTripsQuery = {
  pastGuestBookings: Array<{
    __typename: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    listing: {
      __typename: "Listing";
      id: string;
      photoThumbnail: string;
      title: string;
    };
    locationReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    hostReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
    guestReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
  } | null>;
};
