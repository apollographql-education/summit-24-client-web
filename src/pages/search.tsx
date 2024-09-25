import { ListingItem } from "../components/ListingItem";
import { Divider } from "@chakra-ui/react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
} from "./__generated__/search.types";
import { PageContainer } from "../components/PageContainer";
import { SearchForm } from "../components/SearchForm";
import { SearchResultsHeader } from "../components/SearchResultsHeader";
import { useSearchParams } from "../hooks/useSearchParams";
import { getListingParamsFromSearchParams } from "../utils/search";
import { SearchResultsContainer } from "../components/SearchResultsContainer";
// import { SearchResultsSpinner } from "../components/SearchResultsSpinner";
import { SearchPaginator } from "../components/SearchPaginator";
import { SearchResultsEmpty } from "../components/SearchResultsEmpty";
import { ListingList } from "../components/ListingList";

export const SEARCH_LISTINGS: TypedDocumentNode<
  SearchListingsQuery,
  SearchListingsQueryVariables
> = gql`
  query SearchListings($searchListingsInput: SearchListingsInput!) {
    searchListings(criteria: $searchListingsInput) {
      id
      ...ListingItem_listing
    }
  }

  ${ListingItem.fragments.listing}
`;

/* Exercise 7
 *
 * Docs on useBackgroundQuery and useReadQuery:
 * https://www.apollographql.com/docs/react/data/suspense#avoiding-request-waterfalls
 */

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const listingParams = getListingParamsFromSearchParams(searchParams);

  const { data } = useSuspenseQuery(SEARCH_LISTINGS, {
    variables: { searchListingsInput: listingParams },
  });
  // const [queryRef] = useBackgroundQuery(SEARCH_LISTINGS, {
  //   variables: { searchListingsInput: listingParams },
  // });

  return (
    <PageContainer>
      <SearchForm
        checkInDate={listingParams.checkInDate}
        checkOutDate={listingParams.checkOutDate}
        numOfBeds={listingParams.numOfBeds}
        onChange={(values) => setSearchParams(values)}
      />
      <Divider />
      <SearchResultsContainer>
        <SearchResultsHeader
          sortBy={listingParams.sortBy}
          onChange={setSearchParams}
        />

        <SearchResults
          searchListings={data.searchListings}
          page={listingParams.page}
          limit={listingParams.limit}
          checkInDate={listingParams.checkInDate}
          checkOutDate={listingParams.checkOutDate}
          onChangePage={(page) => setSearchParams({ page })}
        />
      </SearchResultsContainer>
    </PageContainer>
  );
}

interface SearchResultsProps {
  // queryRef: QueryRef<SearchListingsQuery>
  searchListings: SearchListingsQuery["searchListings"];
  page: number;
  limit: number;
  checkInDate: string;
  checkOutDate: string;
  onChangePage: (page: number) => void;
}

function SearchResults({
  // queryRef,
  searchListings,
  page,
  limit,
  checkInDate,
  checkOutDate,
  onChangePage,
}: SearchResultsProps) {
  // const { data } = useReadQuery(queryRef);
  // const { searchListings } = data;

  return (
    <>
      {searchListings.length > 0 ? (
        <ListingList>
          {searchListings.filter(Boolean).map((listing) => (
            <ListingItem
              key={listing.id}
              listing={listing}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          ))}
        </ListingList>
      ) : (
        <SearchResultsEmpty />
      )}

      <SearchPaginator
        page={page}
        onChange={onChangePage}
        hasNextPage={searchListings.length === limit}
      />
    </>
  );
}
