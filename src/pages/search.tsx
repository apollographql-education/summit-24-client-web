import BedroomInput from "../components/BedroomInput";
import ListingCell from "../components/ListingCell";
import { useEffect, useState } from "react";
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
import {
  gql,
  QueryRef,
  TypedDocumentNode,
  useQuery,
  useReadQuery,
} from "@apollo/client";
import { useSearchParams } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import {
  SearchListingsQuery,
  SearchListingsQueryVariables,
} from "./__generated__/search.types";
import { SortByCriteria } from "../__generated__/types";
import { DatePickerInput } from "../components/DatePickerInput";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";
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

function getListingSearchParams(searchParams: URLSearchParams) {
  const checkInDateString = searchParams.get("startDate");
  const checkOutDateString = searchParams.get("endDate");

  if (!checkInDateString || !checkOutDateString) {
    throw new Error("Could not determine dates to check");
  }

  return {
    checkInDate: checkInDateString,
    checkOutDate: checkOutDateString,
    sortBy:
      (searchParams.get("sortBy") as SortByCriteria | null) ??
      SortByCriteria.COST_ASC,
    limit: 5,
    numOfBeds: parseInt(searchParams.get("numOfBeds") ?? "1", 10),
    page: parseInt(searchParams.get("page") ?? "1", 10),
  };
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const today = new Date();
  const listingParams = getListingSearchParams(searchParams);

  const { data, loading, error } = useQuery(SEARCH_LISTINGS, {
    variables: { searchListingsInput: listingParams },
  });

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

        {loading ? (
          <PageSpinner />
        ) : error ? (
          <PageError error={error} />
        ) : (
          <SearchResults
            searchListings={data?.searchListings ?? []}
            page={listingParams.page}
            checkInDate={listingParams.checkInDate}
            checkOutDate={listingParams.checkOutDate}
            onChangePage={(page) => setParams({ page: String(page) })}
          />
        )}
      </Stack>
    </PageContainer>
  );
}

interface SearchResultsProps {
  searchListings: SearchListingsQuery["searchListings"];
  page: number;
  checkInDate: string;
  checkOutDate: string;
  onChangePage: (page: number) => void;
}

function SearchResults({
  searchListings,
  checkInDate,
  checkOutDate,
  page,
  onChangePage,
}: SearchResultsProps) {
  const [nextPageButtonDisabled, setNextPageButtonDisabled] = useState(false);

  useEffect(() => {
    if (searchListings.length === 0) {
      const newPage = page - 1;
      onChangePage(newPage);
      setNextPageButtonDisabled(true);
    }
  }, [searchListings.length, page, onChangePage]);

  return (
    <>
      {searchListings.length > 0 ? (
        <VStack spacing="4">
          {searchListings.filter(Boolean).map((listing) => (
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
    </>
  );
}
