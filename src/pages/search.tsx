import { ListingItem } from "../components/ListingItem";
import { Divider } from "@chakra-ui/react";
import { gql, QueryRef, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
} from "./__generated__/search.types";
import { PageError } from "../components/PageError";
import { PageContainer } from "../components/PageContainer";
import { preloadQuery } from "../apollo/preloadQuery";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchForm } from "../components/SearchForm";
import { SearchResultsHeader } from "../components/SearchResultsHeader";
import { useSearchParams } from "../hooks/useSearchParams";
import { getListingParamsFromSearchParams } from "../utils";
import { SearchResultsContainer } from "../components/SearchResultsContainer";
import { SearchResultsSpinner } from "../components/SearchResultsSpinner";
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
`;

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const listingParams = getListingParamsFromSearchParams(url.searchParams);

  return preloadQuery(SEARCH_LISTINGS, {
    variables: { searchListingsInput: listingParams },
  }).toPromise();
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const listingParams = getListingParamsFromSearchParams(searchParams);

  return (
    <PageContainer>
      <SearchForm
        checkInDate={listingParams.checkInDate}
        checkOutDate={listingParams.checkOutDate}
        numOfBeds={listingParams.numOfBeds}
        onChange={setSearchParams}
      />
      <Divider />
      <SearchResultsContainer>
        <SearchResultsHeader
          limit={listingParams.limit}
          sortBy={listingParams.sortBy}
          onChange={setSearchParams}
        />

        <Suspense fallback={<SearchResultsSpinner />}>
          <ErrorBoundary
            fallbackRender={({ error }) => <PageError error={error} />}
          >
            <SearchResults
              queryRef={queryRef}
              page={listingParams.page}
              limit={listingParams.limit}
              checkInDate={listingParams.checkInDate}
              checkOutDate={listingParams.checkOutDate}
              onChangePage={(page) => setSearchParams({ page })}
            />
          </ErrorBoundary>
        </Suspense>
      </SearchResultsContainer>
    </PageContainer>
  );
}

interface SearchResultsProps {
  queryRef: QueryRef<SearchListingsQuery, SearchListingsQueryVariables>;
  page: number;
  limit: number;
  checkInDate: string;
  checkOutDate: string;
  onChangePage: (page: number) => void;
}

function SearchResults({
  queryRef,
  page,
  limit,
  checkInDate,
  checkOutDate,
  onChangePage,
}: SearchResultsProps) {
  const { data } = useReadQuery(queryRef);

  return (
    <>
      {data.searchListings.length > 0 ? (
        <ListingList>
          {data.searchListings.filter(Boolean).map((listing) => (
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
        hasNextPage={data.searchListings.length === limit}
      />
    </>
  );
}
