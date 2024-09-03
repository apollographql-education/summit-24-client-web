import * as GraphQLTypes from "../../__generated__/types";

export type GetGuestTripsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetGuestTripsQuery = {
  upcomingGuestBookings: Array<{
    __typename: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: GraphQLTypes.BookingStatus;
    listing: {
      __typename: "Listing";
      id: string;
      photoThumbnail: string;
      title: string;
    };
    locationReview: {
      __typename: "Review";
      rating: number;
      text: string;
    } | null;
    hostReview: { __typename: "Review"; rating: number; text: string } | null;
    guestReview: { __typename: "Review"; rating: number; text: string } | null;
  } | null>;
};
