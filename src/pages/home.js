import BedroomInput from '../components/BedroomInput';
import Hero from '../components/Hero';
import Layout from '../layouts/Layout';
import ListingCard from '../components/ListingCard';
import Nav from '../components/Nav';
import QueryResult from '../components/QueryResult';
import React, {useState} from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Text
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {format} from 'date-fns';
import {getDatePickerProps} from '../utils';
import {gql, useQuery} from '@apollo/client';

import 'react-datepicker/dist/react-datepicker.css';

export const FEATURED_LISTINGS = gql`
  query GetFeaturedListings {
    featuredListings {
      id
      title
      photoThumbnail
      numOfBeds
      overallRating
    }
  }
`;

export default function Home() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [numOfBeds, setNumOfBeds] = useState(1);

  const INPUT_PROPS = {size: 'lg', width: '300px'};
  const DATEPICKER_PROPS = getDatePickerProps({
    today,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    props: INPUT_PROPS
  });

  const {loading, error, data} = useQuery(FEATURED_LISTINGS);

  return (
    <>
      <Hero>
        <Nav isLight />
        <Container maxW="container.md" textColor="white">
          <Flex
            direction="column"
            justify="space-between"
            minH="300px"
            align="center"
          >
            <Flex direction="row" justify="space-between" minWidth="100%">
              <Stack direction="column" spacing={2}>
                <Text fontSize="large" fontWeight="bold">
                  Check in
                </Text>
                <Input {...DATEPICKER_PROPS} selected={startDate} />
              </Stack>
              <Stack direction="column" spacing={2}>
                <Text fontSize="large" fontWeight="bold">
                  Check out
                </Text>
                <Input
                  {...DATEPICKER_PROPS}
                  minDate={today < startDate ? startDate : today}
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                />
              </Stack>
            </Flex>
            <BedroomInput
              {...INPUT_PROPS}
              numOfBeds={numOfBeds}
              setNumOfBeds={setNumOfBeds}
            />
            <Button
              as={Link}
              to={`/search/?startDate=${format(
                startDate,
                'MM-dd-yyyy'
              )}&endDate=${format(
                endDate,
                'MM-dd-yyyy'
              )}&numOfBeds=${numOfBeds}`}
              colorScheme="pink"
              {...INPUT_PROPS}
            >
              Find a place
            </Button>
          </Flex>
        </Container>
      </Hero>
      <QueryResult loading={loading} error={error} data={data}>
        {data => (
          <Layout noNav>
            <Container maxW="container.xl" pt="4">
              <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="4">
                Explore Space
              </Heading>
              <SimpleGrid columns={[2, null, 3]} spacing={4}>
                {data &&
                  data.featuredListings.map(listing => (
                    <ListingCard key={listing.title} {...listing} />
                  ))}
              </SimpleGrid>
            </Container>
          </Layout>
        )}
      </QueryResult>
    </>
  );
}
