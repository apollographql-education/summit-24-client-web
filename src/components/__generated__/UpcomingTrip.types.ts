import * as GraphQLTypes from "../../__generated__/types";

export type SubmitHostAndLocationReviewsMutationVariables = GraphQLTypes.Exact<{
  bookingId: GraphQLTypes.Scalars["ID"]["input"];
  hostReview: GraphQLTypes.ReviewInput;
  locationReview: GraphQLTypes.ReviewInput;
}>;

export type SubmitHostAndLocationReviewsMutation = {
  submitHostAndLocationReviews: {
    __typename: "SubmitHostAndLocationReviewsResponse";
    success: boolean;
    message: string;
    hostReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
    locationReview: {
      __typename: "Review";
      id: string;
      text: string;
      rating: number;
    } | null;
  };
};

export type UpcomingTrip_tripFragment = {
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
};
