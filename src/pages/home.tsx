import { gql, TypedDocumentNode, useQuery } from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "./__generated__/home.types";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";
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

export default function Home() {
  const { data, loading, error } = useQuery(FEATURED_LISTINGS);

  return (
    <>
      <HomePageHero />
      {loading ? (
        <PageSpinner />
      ) : error ? (
        <PageError error={error} />
      ) : (
        <FeaturedListingContainer>
          <FeaturedListingTitle>
            Ideas for your next stellar trip
          </FeaturedListingTitle>
          <ListingList>
            {data?.featuredListings.map((listing) => (
              <ListingItem key={listing.id} listing={listing} />
            ))}
          </ListingList>
        </FeaturedListingContainer>
      )}
    </>
  );
}
