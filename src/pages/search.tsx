import BedroomInput from "../components/BedroomInput";
import ListingCell from "../components/ListingCell";
import format from "date-fns/format";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { gql, QueryRef, TypedDocumentNode, useReadQuery } from "@apollo/client";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
} from "./__generated__/search.types";
import { SortByCriteria } from "../__generated__/types";
import { DatePickerInput } from "../components/DatePickerInput";
import { PageError } from "../components/PageError";
import { PageContainer } from "../components/PageContainer";
import { preloadQuery } from "../apolloClient";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const SEARCH_LISTINGS: TypedDocumentNode<
  SearchListingsQuery,
  SearchListingsQueryVariables
> = gql`
  query SearchListings($searchListingsInput: SearchListingsInput!) {
    searchListings(criteria: $searchListingsInput) {
      id
      ...ListingCell_listing
    }
  }
`;

function getListingSearchParams(searchParams: URLSearchParams) {
  const checkInDate = searchParams.get("startDate");
  const checkOutDate = searchParams.get("endDate");

  if (!checkInDate || !checkOutDate) {
    throw new Error("Could not determine dates to check");
  }

  return {
    checkInDate,
    checkOutDate,
    sortBy:
      (searchParams.get("sortBy") as SortByCriteria | null) ??
      SortByCriteria.COST_ASC,
    limit: parseInt(searchParams.get("limit") ?? "5", 10),
    numOfBeds: parseInt(searchParams.get("numOfBeds") ?? "1", 10),
    page: parseInt(searchParams.get("page") ?? "1", 10),
  };
}

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const listingParams = getListingSearchParams(url.searchParams);

  return preloadQuery(SEARCH_LISTINGS, {
    variables: { searchListingsInput: listingParams },
  }).toPromise();
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const today = new Date();
  const listingParams = getListingSearchParams(searchParams);

  const checkInDate = new Date(listingParams.checkInDate);
  const checkOutDate = new Date(listingParams.checkOutDate);

  function setParams(params: Record<string, string>) {
    setSearchParams(
      (currentParams) =>
        new URLSearchParams(
          Object.fromEntries([
            ...Array.from(currentParams.entries()),
            ...Object.entries(params),
          ]),
        ),
    );
  }

  function formatDateForURL(date: Date) {
    return format(date, "MM-dd-yyyy");
  }

  function setStartDate(date: Date) {
    setParams({ startDate: formatDateForURL(date) });
  }

  function setEndDate(date: Date) {
    setParams({ endDate: formatDateForURL(date) });
  }

  return (
    <PageContainer>
      <Center>
        <Stack>
          <Heading as="h1" mb="6" textAlign="center">
            Your search
          </Heading>
          <Box>
            <Flex
              minWidth="100%"
              mb="4"
              align="flex-end"
              flexWrap="wrap"
              sx={{ gap: "24px" }}
            >
              <Stack direction="column" spacing={2}>
                <Text as="label" fontSize="large" fontWeight="bold">
                  Check-in Date
                </Text>
                <DatePickerInput
                  size="lg"
                  today={today}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  selected={checkInDate}
                  width="150px"
                />
              </Stack>
              <Stack direction="column" spacing={2}>
                <Text as="label" fontSize="large" fontWeight="bold">
                  Check-out Date
                </Text>
                <DatePickerInput
                  size="lg"
                  today={today}
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                  selected={checkOutDate}
                  minDate={today < checkInDate ? checkInDate : today}
                  onChange={setEndDate}
                  width="150px"
                />
              </Stack>
              <BedroomInput
                size="lg"
                w="150px"
                numOfBeds={listingParams.numOfBeds}
                setNumOfBeds={(numOfBeds) =>
                  setParams({ numOfBeds: String(numOfBeds) })
                }
              />
            </Flex>
          </Box>
        </Stack>
      </Center>
      <Divider borderWidth="1px" />
      <Stack mb="8" p={12} pt={9}>
        <Flex alignItems="center" mb="4" flexWrap="wrap" gap={4}>
          <Heading as="h2" fontSize="3xl" flex={1}>
            Stays across space
          </Heading>
          <Flex alignItems="center" flexWrap="wrap">
            <Text fontWeight="bold" fontSize="lg" mr={4}>
              Results per page
            </Text>
            <Select
              width="75px"
              size="lg"
              onChange={(e) => {
                setParams({ limit: e.target.value, page: "1" });
              }}
              value={listingParams.limit}
            >
              <option disabled>Per page</option>
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Select>
          </Flex>
          <Flex alignItems="center" flexWrap="wrap">
            <Text fontWeight="bold" fontSize="lg" mr={4}>
              Sort by
            </Text>
            <Select
              width="200px"
              size="lg"
              onChange={(e) => {
                setParams({ sortBy: e.target.value, page: "1" });
              }}
              value={listingParams.sortBy}
            >
              <option disabled>Sort by</option>
              <option value="COST_ASC">Price (low to high)</option>
              <option value="COST_DESC">Price (high to low)</option>
            </Select>
          </Flex>
        </Flex>

        <Suspense
          fallback={
            <Center minH="20rem">
              <Spinner size="lg" />
            </Center>
          }
        >
          <ErrorBoundary
            fallbackRender={({ error }) => <PageError error={error} />}
          >
            <SearchResults
              queryRef={queryRef}
              page={listingParams.page}
              checkInDate={listingParams.checkInDate}
              checkOutDate={listingParams.checkOutDate}
              onChangePage={(page) => setParams({ page: String(page) })}
            />
          </ErrorBoundary>
        </Suspense>
      </Stack>
    </PageContainer>
  );
}

interface SearchResultsProps {
  queryRef: QueryRef<SearchListingsQuery, SearchListingsQueryVariables>;
  page: number;
  checkInDate: string;
  checkOutDate: string;
  onChangePage: (page: number) => void;
}

function SearchResults({
  queryRef,
  page,
  checkInDate,
  checkOutDate,
  onChangePage,
}: SearchResultsProps) {
  const { data } = useReadQuery(queryRef);

  return (
    <>
      {data.searchListings.length > 0 ? (
        <VStack spacing="4">
          {data.searchListings.filter(Boolean).map((listing) => (
            <ListingCell
              key={listing.id}
              listing={listing}
              to={`/listing/${listing.id}/?startDate=${
                checkInDate
              }&endDate=${checkOutDate}`}
            />
          ))}
        </VStack>
      ) : (
        <Center my={20}>
          <Heading size="lg">No results found</Heading>
        </Center>
      )}

      <Flex justifyContent="space-between" alignItems="center">
        <Button onClick={() => onChangePage(page - 1)} isDisabled={page === 1}>
          Previous page
        </Button>
        <Box>Page {page}</Box>
        <Button
          onClick={() => onChangePage(page + 1)}
          isDisabled={data.searchListings.length === 0}
        >
          Next page
        </Button>
      </Flex>
    </>
  );
}
