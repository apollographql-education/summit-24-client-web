import { ApolloClient, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { cache } from "./cache";

const httpLink = createHttpLink({
  uri: (operation) =>
    `https://rt-airlock-router.herokuapp.com?operationName=${operation.operationName}`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  name: "web-client",
  version: "1.0",
});
