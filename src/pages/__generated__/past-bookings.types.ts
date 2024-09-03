import * as GraphQLTypes from "../../__generated__/types";

export type SubmitGuestReviewMutationVariables = GraphQLTypes.Exact<{
  bookingId: GraphQLTypes.Scalars["ID"]["input"];
  guestReview: GraphQLTypes.ReviewInput;
}>;

export type SubmitGuestReviewMutation = {
  submitGuestReview: {
    __typename: "SubmitGuestReviewResponse";
    success: boolean;
    message: string;
    guestReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  };
};

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
    listing: { __typename: "Listing"; id: string };
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
    guest: {
      __typename: "Guest";
      id: string;
      profilePicture: string;
      name: string;
    };
    guestReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
  } | null>;
};
