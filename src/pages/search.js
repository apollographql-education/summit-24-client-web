import DatePicker from 'react-datepicker';
import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import React, {useState} from 'react';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  Select,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useLocation} from 'react-router-dom';

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

  const [checkInDate, setStartDate] = useState(new Date(checkInDateFromUrl));
  const [checkOutDate, setEndDate] = useState(new Date(checkOutDateFromUrl));
  const [numOfBeds, setNumOfBeds] = useState(numOfBedsFromUrl);
  const [sortBy, setSortBy] = useState('costPerNight');

  const INPUT_PROPS = {size: 'lg'};

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

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }
  if (error) {
    return <div>uhoh error! {error.message}</div>;
  }

  const sortedListings = [...data.searchListings].sort((a, b) => {
    if (sortBy === 'overallRating') {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? -1 : 1;
    }
  });

  return (
    <Layout>
      <Heading as="h1" mb="6">
        Search Listings
      </Heading>
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          Dates
        </Text>
        <HStack spacing="6" minWidth="100%" mb="4">
          <Flex direction="row" align="center">
            <Input
              type="date"
              {...INPUT_PROPS}
              as={DatePicker}
              variant="flushed"
              selected={checkInDate}
              dateFormat="MMM d, yyyy"
              startDate={checkInDate}
              endDate={checkOutDate}
              onChange={date => setStartDate(date)}
            />
            <Text mx="3"> - </Text>
            <Input
              type="date"
              {...INPUT_PROPS}
              as={DatePicker}
              variant="flushed"
              selected={checkOutDate}
              dateFormat="MMM d, yyyy"
              startDate={checkInDate}
              endDate={checkOutDate}
              onChange={date => setEndDate(date)}
            />
          </Flex>
          <Select
            width="150px"
            {...INPUT_PROPS}
            onChange={e => setNumOfBeds(Number(e.target.value))}
            value={numOfBeds}
          >
            <option disabled="disabled">Number of bedrooms</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </Select>
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
    </Layout>
  );
}
