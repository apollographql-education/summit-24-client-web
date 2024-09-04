import {
  ApolloClient,
  createHttpLink,
  createQueryPreloader,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { fragments } from "./fragments";

const cache = new InMemoryCache({
  fragments,
  typePolicies: {
    Query: {
      fields: {
        searchListings: {
          keyArgs: [
            "criteria",
            ["checkInDate", "checkOutDate", "sortBy", "numOfBeds"],
          ],
        },
        listing: {
          read: (_, { args, toReference }) => {
            return toReference({ __typename: "Listing", id: args?.id });
          },
        },
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: "https://rt-airlock-router.herokuapp.com/",
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
  version: "0.9",
});

export const preloadQuery = createQueryPreloader(client);
