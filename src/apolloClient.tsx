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
          read: (allListings, { args, storage }) => {
            if (!allListings) {
              return;
            }

            const page = args?.criteria?.page || 1;
            const limit = args?.criteria?.limit || 5;

            const offset = (page - 1) * limit;

            const listings = allListings
              ? allListings.slice(offset, offset + limit)
              : [];

            if (listings.length > 0 && listings.every(Boolean)) {
              return listings;
            }

            if (storage.fetchedPages?.get(limit)?.has(page)) {
              return [];
            }

            return undefined;
          },
          merge: (existing, incoming = [], { args, storage }) => {
            const page = args?.criteria?.page || 1;
            const limit = args?.criteria?.limit || 5;
            const offset = (page - 1) * limit;

            storage.fetchedPages ||= new Map<number, Set<number>>();
            let set = storage.fetchedPages.get(limit);

            if (!set) {
              set = new Set<number>();
              storage.fetchedPages.set(limit, set);
            }

            set.add(page);

            if (incoming.length === 0) {
              return existing;
            }

            const listings = existing
              ? existing.slice(0)
              : Array(offset + limit).fill(undefined);

            for (let i = 0; i < limit; i++) {
              if (incoming[i]) {
                listings[i + offset] = incoming[i];
              }
            }

            return listings;
          },
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
