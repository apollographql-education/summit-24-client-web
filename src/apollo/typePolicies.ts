import { TypePolicies } from "@apollo/client";

/*
 * Exercise 1: Add a field policy that helps prevent a network request for data
 * already loaded in the cache. We will use a read function to help us.
 *
 * Use the following steps to reproduce the issue:
 * 1. Login as a "Host"
 * 2. Click on "My listings" next to the user avatar to view the listings page.
 *    You should be at http://localhost:3000/listings
 * 3. Click on "Manage Bookings" for any listing. You will notice the
 *    "GetBooking" query execute a network request even though we already have
 *    that data in the cache. We want to fix this.
 *
 * We notice the manage bookings page executes a query on the `listing` field on
 * the root query. Let's add a `read` function that will help us prevent the
 * network request.
 *
 * You can read more on read functions in the documentation:
 * https://www.apollographql.com/docs/react/caching/cache-field-behavior#the-read-function
 *
 * If you need a hint, check out the documentation on cache redirects:
 * https://www.apollographql.com/docs/react/caching/advanced-topics#cache-redirects
 */
export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      listing: {
        read() {},
      },
    },
  },
};
