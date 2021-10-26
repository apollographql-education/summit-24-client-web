import BedroomInput from '../components/BedroomInput';
import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import QueryResult from '../components/QueryResult';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  Text,
  VStack
} from '@chakra-ui/react';
import {getDatePickerProps} from '../utils';
import {gql, useQuery} from '@apollo/client';
import {useLocation} from 'react-router-dom';

import 'react-datepicker/dist/react-datepicker.css';

export const SEARCH_LISTINGS = gql`
  query SearchListings($searchListingsInput: SearchListingsInput!) {
    searchListings(criteria: $searchListingsInput) {
      id
      title
      photoThumbnail
      numOfBeds
      description
      overallRating
      costPerNight
      locationType
    }
  }
`;
export default function Search() {
  function useSearchQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useSearchQuery();
  const checkInDateFromUrl = query.get('startDate');
  const checkOutDateFromUrl = query.get('endDate');
  const numOfBedsFromUrl = parseInt(query.get('numOfBeds')) || 1;

  const today = new Date();
  const [checkInDate, setStartDate] = useState(new Date(checkInDateFromUrl));
  const [checkOutDate, setEndDate] = useState(new Date(checkOutDateFromUrl));
  const [numOfBeds, setNumOfBeds] = useState(numOfBedsFromUrl);
  const [sortBy, setSortBy] = useState('costPerNight');

  const INPUT_PROPS = {size: 'lg'};
  const DATEPICKER_PROPS = getDatePickerProps({
    today,
    startDate: checkInDate,
    endDate: checkOutDate,
    setStartDate,
    setEndDate,
    props: INPUT_PROPS
  });

  const {loading, error, data} = useQuery(SEARCH_LISTINGS, {
    variables: {
      searchListingsInput: {
        checkInDate,
        checkOutDate,
        numOfBeds,
        page: 1,
        limit: 5
      }
    }
  });

  let sortedListings = [];

  if (data) {
    sortedListings = [...data.searchListings].sort((a, b) => {
      if (sortBy === 'overallRating') {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      }
    });
  }

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        <Heading as="h1" mb="6">
          Search Listings
        </Heading>
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            Dates
          </Text>
          <HStack spacing="6" minWidth="100%" mb="4">
            <Flex direction="row" align="center">
              <Input {...DATEPICKER_PROPS} selected={checkInDate} />
              <Text mx="3"> - </Text>
              <Input
                {...DATEPICKER_PROPS}
                selected={checkOutDate}
                minDate={today < checkInDate ? checkInDate : today}
                onChange={date => setEndDate(date)}
              />
            </Flex>
            <BedroomInput
              width="150px"
              {...INPUT_PROPS}
              numOfBeds={numOfBeds}
              setNumOfBeds={setNumOfBeds}
            />
            <Button colorScheme="pink" width="150px" {...INPUT_PROPS}>
              Search
            </Button>
          </HStack>
          <Divider mb="4" borderWidth="1px" />
        </Box>
        {data && (
          <Flex direction="column">
            <Flex alignSelf="flex-end" align="center" mb="4">
              <Text fontWeight="bold" fontSize="xl" mx="2">
                Sort by -
              </Text>
              <Select
                width="150px"
                {...INPUT_PROPS}
                onChange={e => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option disabled="disabled">Sort by</option>
                <option value="costPerNight">Price</option>
                <option value="overallRating">Rating</option>
                <option value="numOfBeds">Number of bedrooms</option>
              </Select>
            </Flex>
            <VStack spacing="4">
              {sortedListings.map(listingData => (
                <ListingCell key={listingData.title} {...listingData} />
              ))}
            </VStack>
          </Flex>
        )}
      </QueryResult>
    </Layout>
  );
}
