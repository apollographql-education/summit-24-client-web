import { Suspense } from "react";
import { useLoaderData } from "react-router-dom";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "./__generated__/home.types";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";
import { preloadQuery } from "../apollo/preloadQuery";
import { HomePageHero } from "../components/HomePageHero";
import { ListingList } from "../components/ListingList";
import { ListingItem } from "../components/ListingItem";
import { FeaturedListingTitle } from "../components/FeaturedListingTitle";
import { FeaturedListingContainer } from "../components/FeaturedListingContainer";

export const FEATURED_LISTINGS: TypedDocumentNode<
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables
> = gql`
  query GetFeaturedListings {
    featuredListings {
      id
      ...ListingItem_listing
    }
  }
`;

export function loader() {
  return preloadQuery(FEATURED_LISTINGS).toPromise();
}

export default function Home() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  return (
    <>
      <HomePageHero />
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <FeaturedListingContainer>
            <FeaturedListingTitle>
              Ideas for your next stellar trip
            </FeaturedListingTitle>
            <ListingList>
              {data.featuredListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing} />
              ))}
            </ListingList>
          </FeaturedListingContainer>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}
