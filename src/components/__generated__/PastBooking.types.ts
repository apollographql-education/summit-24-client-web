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
