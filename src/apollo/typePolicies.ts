import { TypePolicies } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      listing: {
        read() {},
      },
    },
  },
};
