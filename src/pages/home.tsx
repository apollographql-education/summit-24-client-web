import { gql, useSuspenseQuery, TypedDocumentNode } from "@apollo/client";

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

/* Exercise 6
 *
 * Docs on Apollo Client Suspense integration:
 * https://www.apollographql.com/docs/react/data/suspense
 */
export function Home() {
  const { data } = useSuspenseQuery(FEATURED_LISTINGS);

  return (
    <>
      <HomePageHero />
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
      <InflationButton />
    </>
  );
}
