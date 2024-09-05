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
