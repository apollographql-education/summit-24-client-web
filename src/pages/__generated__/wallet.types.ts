import * as GraphQLTypes from "../../__generated__/types";

export type AddFundsMutationVariables = GraphQLTypes.Exact<{
  amount: GraphQLTypes.Scalars["Float"]["input"];
}>;

export type AddFundsMutation = {
  addFundsToWallet: {
    __typename: "AddFundsToWalletResponse";
    amount: number | null;
  };
};

export type GetFundsQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetFundsQuery = {
  me:
    | { __typename: "Guest"; funds: number; id: string }
    | { __typename: "Host"; id: string };
};
