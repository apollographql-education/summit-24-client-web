import * as GraphQLTypes from "../../../__generated__/types";

export type ListingReviews_reviewsFragment = {
  __typename: "Review";
  rating: number;
  text: string;
  author:
    | { __typename: "Guest"; id: string; name: string; profilePicture: string }
    | { __typename: "Host"; id: string; name: string; profilePicture: string };
};
