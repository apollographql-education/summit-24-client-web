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
// We can use the <PageSpinner /> as the fallback
// import { PageSpinner } from "../components/PageSpinner";

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

export function Home() {
  const { data } = useSuspenseQuery(FEATURED_LISTINGS);

  return (
    <>
      <HomePageHero />
      <FeaturedListingContainer>
        <FeaturedListingTitle>
          Ideas for your next stellar trip
        </FeaturedListingTitle>
        {/* Let's show the loading fallback here instead */}
        <ListingList>
          {data.featuredListings.map((listing) => (
            <ListingItem key={listing.id} listing={listing} />
          ))}
        </ListingList>
        {/* <FeaturedListings /> */}
      </FeaturedListingContainer>
      <InflationButton />
    </>
  );
}

/* Exercise 7:
 * Let's make our UX a bit better by showing the loading fallback only where the
 * listing items are displayed. Use the template below to extract a component
 * that suspends instead of the <Home /> component.
 */

// interface FeaturedListingsProps {
//
// }

// function FeaturedListings({ }: FeaturedListingsProps) {
//
// }
