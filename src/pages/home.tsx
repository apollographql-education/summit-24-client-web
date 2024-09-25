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
