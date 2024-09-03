import BedroomInput from "../components/BedroomInput";
import ListingCell from "../components/ListingCell";
import { Suspense, useEffect, useState } from "react";
import format from "date-fns/format";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Select,
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
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";
import { preloadQuery } from "../apolloClient";
import { PageContainer } from "../components/PageContainer";

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

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const checkInDate = url.searchParams.get("startDate");
  const checkOutDate = url.searchParams.get("endDate");
  const sortBy =
    (url.searchParams.get("sortBy") as SortByCriteria | null) ??
    SortByCriteria.COST_ASC;

  if (!checkInDate || !checkOutDate) {
    throw new Error("Could not determine dates to check");
  }

  const params = {
    checkInDate,
    checkOutDate,
    sortBy,
    limit: 5,
    numOfBeds: parseInt(url.searchParams.get("numOfBeds") ?? "1", 10),
    page: parseInt(url.searchParams.get("page") ?? "1", 10),
  };

  return {
    params,
    queryRef: await preloadQuery(SEARCH_LISTINGS, {
      variables: { searchListingsInput: params },
    }).toPromise(),
  };
}

export default function Search() {
  const { queryRef, params } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();
  const checkInDate = new Date(params.checkInDate);
  const checkOutDate = new Date(params.checkOutDate);

  function setSearchParam(key: string, value: string) {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  }

  function formatDateForURL(date: Date) {
    return format(date, "MM-dd-yyyy");
  }

  function setStartDate(date: Date) {
    setSearchParam("startDate", formatDateForURL(date));
  }

  function setEndDate(date: Date) {
    setSearchParam("endDate", formatDateForURL(date));
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
                numOfBeds={params.numOfBeds}
                setNumOfBeds={(numOfBeds) =>
                  setSearchParam("numOfBeds", String(numOfBeds))
                }
              />
              <Button w="150px" size="lg">
                Find a place
              </Button>
            </Flex>
          </Box>
        </Stack>
      </Center>
      <Divider borderWidth="1px" />
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          key={[checkInDate, checkOutDate, params.numOfBeds].join("-")}
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <SearchResults
            queryRef={queryRef}
            page={params.page}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            sortBy={params.sortBy}
            onChangePage={(page) => setSearchParam("page", String(page))}
            onChangeSort={(sortBy) => setSearchParam("sortBy", sortBy)}
          />
        </ErrorBoundary>
      </Suspense>
    </PageContainer>
  );
}

interface SearchResultsProps {
  queryRef: QueryRef<SearchListingsQuery, SearchListingsQueryVariables>;
  page: number;
  sortBy: SortByCriteria;
  checkInDate: Date;
  checkOutDate: Date;
  onChangePage: (page: number) => void;
  onChangeSort: (sort: SortByCriteria) => void;
}

function SearchResults({
  queryRef,
  checkInDate,
  checkOutDate,
  page,
  sortBy,
  onChangePage,
  onChangeSort,
}: SearchResultsProps) {
  const { data } = useReadQuery(queryRef);
  const [nextPageButtonDisabled, setNextPageButtonDisabled] = useState(false);

  useEffect(() => {
    if (data.searchListings.length === 0) {
      const newPage = page - 1;
      onChangePage(newPage);
      setNextPageButtonDisabled(true);
    }
  }, [data.searchListings.length, page, onChangePage]);

  return (
    <Stack mb="8" p={12} pt={9}>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        mb="4"
        flexWrap="wrap"
      >
        <Heading as="h2" fontSize="3xl">
          Stays across space
        </Heading>
        <Flex alignItems="center" flexWrap="wrap">
          <Text fontWeight="bold" fontSize="lg" mr={4}>
            Sort by
          </Text>
          <Select
            width="200px"
            size="lg"
            onChange={(e) => {
              onChangeSort(e.target.value as SortByCriteria);
              onChangePage(1);
            }}
            value={sortBy}
          >
            <option disabled>Sort by</option>
            <option value="COST_ASC">Price (low to high)</option>
            <option value="COST_DESC">Price (high to low)</option>
          </Select>
        </Flex>
      </Flex>
      {data.searchListings.length > 0 ? (
        <VStack spacing="4">
          {data.searchListings.filter(Boolean).map((listing) => (
            <ListingCell
              key={listing.id}
              listing={listing}
              to={`/listing/${listing.id}/?startDate=${format(
                checkInDate,
                "MM-dd-yyyy",
              )}&endDate=${format(checkOutDate, "MM-dd-yyyy")}`}
            />
          ))}
        </VStack>
      ) : (
        <Heading size="lg">No results found.</Heading>
      )}

      <Flex justifyContent="space-between">
        <Button
          onClick={async () => {
            onChangePage(page - 1);
            setNextPageButtonDisabled(false);
          }}
          isDisabled={page === 1}
        >
          Previous page
        </Button>
        <Button
          onClick={() => onChangePage(page + 1)}
          isDisabled={nextPageButtonDisabled}
        >
          Next page
        </Button>
      </Flex>
    </Stack>
  );
}
