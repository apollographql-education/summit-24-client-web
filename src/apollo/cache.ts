import { InMemoryCache } from "@apollo/client";
import { fragments } from "./fragments";
import { typePolicies } from "./typePolicies";

export const cache = new InMemoryCache({
  fragments,
  typePolicies,
});
