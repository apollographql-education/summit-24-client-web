import * as GraphQLTypes from "../../__generated__/types";

export type GetPastBookingsForHostListingQueryVariables = GraphQLTypes.Exact<{
  listingId: GraphQLTypes.Scalars["ID"]["input"];
  status?: GraphQLTypes.InputMaybe<GraphQLTypes.BookingStatus>;
}>;

export type GetPastBookingsForHostListingQuery = {
  bookingsForListing: Array<{
    __typename: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: GraphQLTypes.BookingStatus;
    guest: {
      __typename: "Guest";
      id: string;
      name: string;
      profilePicture: string;
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
