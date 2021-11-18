import BedroomInput from '../components/BedroomInput';
import Hero from '../components/Hero';
import Layout from '../layouts/Layout';
import ListingCard from '../components/ListingCard';
import Nav from '../components/Nav';
import PropTypes from 'prop-types';
import QueryResult from '../components/QueryResult';
import React, {useState} from 'react';
import {
  Button,
  Center,
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
import {getDatePickerProps, getNextDate} from '../utils';
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

const INPUT_PROPS = {
  size: 'lg',
  width: 'auto',
  maxWidth: '300px',
  marginTop: '2'
};

export default function Home() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(getNextDate(today));
  const [numOfBeds, setNumOfBeds] = useState(1);

  const DATEPICKER_PROPS = getDatePickerProps({
    today,
    startDate,
    endDate,
    setStartDate,
    setEndDate
  });

  const {loading, error, data} = useQuery(FEATURED_LISTINGS);

  return (
    <>
      <Hero>
        <Nav isLight />
        <Center h="calc(100% - 80px)">
          <Container maxW="container.md" textColor="white">
            <Flex
              direction="column"
              justify="space-between"
              minH="225px"
              align="center"
            >
              <Stack spacing="4" direction="row" minWidth="100%">
                <InputContainer label="Check in">
                  <Input
                    {...DATEPICKER_PROPS}
                    {...INPUT_PROPS}
                    selected={startDate}
                  />
                </InputContainer>
                <InputContainer label="Check out">
                  <Input
                    {...DATEPICKER_PROPS}
                    {...INPUT_PROPS}
                    minDate={today < startDate ? startDate : today}
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                  />
                </InputContainer>
                <BedroomInput
                  {...INPUT_PROPS}
                  numOfBeds={numOfBeds}
                  setNumOfBeds={setNumOfBeds}
                />
              </Stack>
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
              >
                Find a place
              </Button>
            </Flex>
          </Container>
        </Center>
      </Hero>
      <QueryResult loading={loading} error={error} data={data}>
        {data => (
          <Layout noNav pt="4">
            <Heading as="h1" fontSize="3xl" fontWeight="bold" mb="4">
              Explore Space
            </Heading>
            <SimpleGrid columns={[2, null, 3]} spacing={4}>
              {data &&
                data.featuredListings.map(listing => (
                  <ListingCard key={listing.title} {...listing} />
                ))}
            </SimpleGrid>
          </Layout>
        )}
      </QueryResult>
    </>
  );
}

function InputContainer({label, children}) {
  return (
    <Stack direction="column" spacing={2}>
      <Text as="label" fontSize="large" fontWeight="bold">
        {label}
        {children}
      </Text>
    </Stack>
  );
}

InputContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node
};
