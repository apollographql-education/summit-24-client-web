import * as GraphQLTypes from "../../__generated__/types";

export type Nav_currentUserFragment = {
  me:
    | { __typename: "Guest"; id: string; profilePicture: string }
    | { __typename: "Host"; id: string; profilePicture: string };
};
