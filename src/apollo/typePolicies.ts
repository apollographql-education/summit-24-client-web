import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      listing: {
        read(_, { args, toReference }) {
          return toReference({ __typename: "Listing", id: args?.id });
        },
      },
    },
  },
};
