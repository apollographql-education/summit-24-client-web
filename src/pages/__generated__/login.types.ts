import * as GraphQLTypes from "../../__generated__/types";

export type LoginQueryVariables = GraphQLTypes.Exact<{ [key: string]: never }>;

export type LoginQuery = {
  me: { __typename: "Guest"; id: string } | { __typename: "Host"; id: string };
};
