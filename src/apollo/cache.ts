import { InMemoryCache } from "@apollo/client";
import { typePolicies } from "./typePolicies";

export const cache = new InMemoryCache({
  typePolicies,
});
