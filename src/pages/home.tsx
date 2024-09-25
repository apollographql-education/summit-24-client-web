import {
  gql,
  TypedDocumentNode,
  useBackgroundQuery,
  useReadQuery,
  QueryRef,
} from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "./__generated__/home.types";
import { HomePageHero } from "../components/HomePageHero";
import { ListingList } from "../components/ListingList";
import { ListingItem } from "../components/ListingItem";
import { FeaturedListingTitle } from "../components/FeaturedListingTitle";
import { FeaturedListingContainer } from "../components/FeaturedListingContainer";
import { InflationButton } from "../components/InflationButton";
import { Suspense } from "react";
import { PageSpinner } from "../components/PageSpinner";

export const FEATURED_LISTINGS: TypedDocumentNode<
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables
> = gql`
  query GetFeaturedListings {
    featuredListings {
      id
      ...ListingItem_listing @nonreactive
    }
  }

  ${ListingItem.fragments.listing}
`;

/* Exercise 8 Bonus
 *
 * Use preloadQuery to start the query in React Router's loader function. The
 * loader function can be added to the route in src/pages/router.tsx
 *
 * Docs for integration with React Router loader functions:
 * https://www.apollographql.com/docs/react/data/suspense#usage-with-data-loading-routers
 *
 * Docs on React Router loader function:
 * https://reactrouter.com/en/main/route/loader
 *
 * Docs on React Router useLoaderData:
 * https://reactrouter.com/en/main/hooks/use-loader-data
 *
 */

export function Home() {
  const [queryRef] = useBackgroundQuery(FEATURED_LISTINGS);

  return (
    <>
      <HomePageHero />
      <FeaturedListingContainer>
        <FeaturedListingTitle>
          Ideas for your next stellar trip
        </FeaturedListingTitle>
        <Suspense fallback={<PageSpinner />}>
          <FeaturedListings queryRef={queryRef} />
        </Suspense>
      </FeaturedListingContainer>
      <InflationButton />
    </>
  );
}

interface FeaturedListingsProps {
  queryRef: QueryRef<GetFeaturedListingsQuery>;
}

function FeaturedListings({ queryRef }: FeaturedListingsProps) {
  const { data } = useReadQuery(queryRef);

  return (
    <ListingList>
      {data.featuredListings.map((listing) => (
        <ListingItem key={listing.id} listing={listing} />
      ))}
    </ListingList>
  );
}
