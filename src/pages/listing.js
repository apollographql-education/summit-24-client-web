import Layout from '../layouts/Layout';
import LocationType from '../components/LocationType';
import PropTypes from 'prop-types';
import QueryResult from '../components/QueryResult';
import React, {useState} from 'react';
import Stars from '../components/Stars';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Input,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import {IoBed, IoCreate} from 'react-icons/io5';
import {Link, useParams} from 'react-router-dom';
import {
  getDatePickerProps,
  getDatesToExclude,
  getFirstValidDate,
  isDateValid,
  useUser
} from '../utils';
import {gql, useQuery} from '@apollo/client';

import 'react-datepicker/dist/react-datepicker.css';

export const LISTING = gql`
  query GetListing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        name
      }
      overallRating
      reviews {
        text
        author {
          name
        }
        rating
      }
      host {
        id
        name
        profilePicture
        profileDescription
        overallRating
      }
      bookings {
        checkInDate
        checkOutDate
      }
    }
  }
`;
export default function Listings() {
  const {id} = useParams();
  const {user} = useUser();
  const {loading, error, data} = useQuery(LISTING, {variables: {id}});

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {data => {
          const {
            title,
            description,
            numOfBeds,
            locationType,
            photoThumbnail,
            amenities,
            host,
            reviews,
            overallRating,
            costPerNight,
            bookings
          } = data?.listing;

          return (
            <Stack direction="column" spacing="6" mb="12">
              <Image
                src={photoThumbnail}
                alt={title}
                objectFit="cover"
                width="100%"
                height="200px"
                maxH="200px"
              />
              <Flex direction="row">
                <Stack flex="1" direction="column" spacing="6">
                  <Flex>
                    <Heading as="h1" size="lg">
                      {title}
                    </Heading>
                    {host && user && host.id === user.id && (
                      <Button
                        as={Link}
                        to={`/listing/${id}/edit`}
                        rightIcon={<IoCreate size={20} />}
                        ml="4"
                      >
                        Edit your listing
                      </Button>
                    )}
                  </Flex>
                  <Stars size={20} rating={overallRating} />
                  <Flex direction="row" justify="space-between">
                    <Text fontSize="lg" fontWeight="regular" mr="1">
                      {description}
                    </Text>
                  </Flex>
                  <Stack direction="row" spacing="4" align="center">
                    <Stack spacing="0.5">
                      <Text fontWeight="bold">Number of beds</Text>
                      <Stack direction="row" align="center">
                        <Text fontSize="lg" fontWeight="semibold" mr="1">
                          {numOfBeds}
                        </Text>
                        <IoBed size={22} />
                      </Stack>
                    </Stack>
                    <Stack spacing="0.5">
                      <Text fontWeight="bold">Location Type </Text>
                      <Stack direction="row" align="center">
                        <LocationType locType={locationType} size="22px" />
                        <Text
                          fontSize="lg"
                          casing="lowercase"
                          fontWeight="semibold"
                          ml="1"
                        >
                          {locationType}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Amenities
                    </Heading>
                    <UnorderedList>
                      {amenities.map(({name}) => (
                        <ListItem key={name}>{name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Host
                    </Heading>
                    <Stack>
                      <Avatar
                        name="profile"
                        size="md"
                        borderColor="white"
                        borderWidth="1px"
                        src={host.profilePicture}
                      />
                      <Text fontWeight="semibold">{host.name}</Text>
                    </Stack>
                  </Box>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Reviews
                    </Heading>
                    <Stack
                      direction="column"
                      spacing="4"
                      divider={<StackDivider borderColor="gray.200" />}
                    >
                      {reviews.length === 0 ? (
                        <Text>No reviews yet</Text>
                      ) : (
                        reviews.map(({text, author, rating}) => (
                          <Stack direction="column" spacing="1" key={text}>
                            <Heading size="sm">{author.name}</Heading>
                            <Stars size={16} rating={rating} />
                            <Text>{text}</Text>
                          </Stack>
                        ))
                      )}
                    </Stack>
                  </Box>
                </Stack>
                <BookStay costPerNight={costPerNight} bookings={bookings} />
              </Flex>
            </Stack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}

function BookStay({costPerNight, bookings}) {
  const today = new Date();
  const {datesToExclude, stringDates} = bookings.reduce(
    (acc, curr) => {
      const {checkInDate, checkOutDate} = curr;
      const {dates, stringDates} = getDatesToExclude(checkInDate, checkOutDate);

      acc.datesToExclude = [...acc.datesToExclude, ...dates];
      acc.stringDates = [...acc.stringDates, ...stringDates];

      return acc;
    },
    {datesToExclude: [], stringDates: []}
  );
  const [checkInDate, setCheckInDate] = useState(
    getFirstValidDate(stringDates)
  );
  const [checkOutDate, setCheckOutDate] = useState(checkInDate);

  const DATEPICKER_PROPS = getDatePickerProps({
    today,
    startDate: checkInDate,
    endDate: checkOutDate,
    setStartDate: setCheckInDate,
    setEndDate: setCheckOutDate,
    excludeDates: datesToExclude
  });

  return (
    <Box ml="4" w="300px" h="300px" borderWidth="2px" borderColor="gray.400">
      <Box bg="gray.200" p="2">
        <Text fontWeight="bold">Book your stay</Text>
      </Box>
      <Box p="2">
        <Text>Dates</Text>
        <Flex direction="row" align="center">
          <Input
            {...DATEPICKER_PROPS}
            selected={checkInDate}
            onChange={date => {
              if (isDateValid(stringDates, date)) {
                setCheckInDate(date);

                const newCheckout = date > checkInDate ? date : checkInDate;
                setCheckOutDate(newCheckout);
              }
            }}
          />
          <Text mx="3"> - </Text>
          <Input
            {...DATEPICKER_PROPS}
            selected={checkOutDate}
            minDate={today < checkInDate ? checkInDate : today}
            onChange={date => {
              if (isDateValid(stringDates, date)) {
                setCheckOutDate(date);
              }
            }}
          />
        </Flex>
        <Text>Price</Text>
        <Text>{costPerNight}</Text>
      </Box>
    </Box>
  );
}

BookStay.propTypes = {
  costPerNight: PropTypes.number,
  bookings: PropTypes.array
};
