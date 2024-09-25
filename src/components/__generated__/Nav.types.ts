import * as GraphQLTypes from "../../__generated__/types";

export type GetMyProfileQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetMyProfileQuery = {
  me:
    | { __typename: "Guest"; id: string; profilePicture: string }
    | { __typename: "Host"; id: string; profilePicture: string };
};
