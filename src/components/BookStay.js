import PropTypes from 'prop-types';
import React, {useMemo, useState} from 'react';
import differenceInDays from 'date-fns/differenceInDays';
import {Box, Button, Flex, Input, Link, Text} from '@chakra-ui/react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {
  areDatesValid,
  getDatePickerProps,
  getDatesToExclude,
  getFirstValidDate,
  getNextDate,
  isDateValid
} from '../utils';
import {gql, useMutation} from '@apollo/client';

import 'react-datepicker/dist/react-datepicker.css';

export const BOOK_STAY = gql`
  mutation BookStay($createBookingInput: CreateBookingInput) {
    createBooking(createBookingInput: $createBookingInput) {
      success
      message
      booking {
        id
        checkInDate
        checkOutDate
      }
    }
  }
`;

export default function BookStay({
  costPerNight,
  bookings,
  listingId,
  refetchQueries,
  userRole
}) {
  // get initial dates from url
  const searchQuery = new URLSearchParams(useLocation().search);
  const checkInDateStringFromUrl = searchQuery.get('startDate');
  const checkOutDateStringFromUrl = searchQuery.get('endDate');
  const checkInDateFromUrl = new Date(checkInDateStringFromUrl);
  const checkOutDateFromUrl = new Date(checkOutDateStringFromUrl);

  //   arrays of dates (in Date and string formats) that are already booked
  const {datesToExclude, stringDates} = useMemo(
    () =>
      bookings.reduce(
        (acc, curr) => {
          const {checkInDate, checkOutDate} = curr;
          const {dates, stringDates} = getDatesToExclude(
            checkInDate,
            checkOutDate
          );

          acc.datesToExclude = [...acc.datesToExclude, ...dates];
          acc.stringDates = [...acc.stringDates, ...stringDates];

          return acc;
        },
        {datesToExclude: [], stringDates: []}
      ),
    [bookings]
  );

  //   if the dates from the url are "invalid" dates, initialize to the first available date
  const [checkInDate, setCheckInDate] = useState(
    checkInDateStringFromUrl && isDateValid(stringDates, checkInDateFromUrl)
      ? new Date(checkInDateFromUrl)
      : getFirstValidDate(stringDates)
  );
  const [checkOutDate, setCheckOutDate] = useState(
    checkOutDateStringFromUrl && isDateValid(stringDates, checkOutDateFromUrl)
      ? new Date(checkOutDateFromUrl)
      : getNextDate(checkInDate)
  );
  const numNights = differenceInDays(checkOutDate, checkInDate);

  const today = new Date();
  const DATEPICKER_PROPS = getDatePickerProps({
    today,
    startDate: checkInDate,
    endDate: checkOutDate,
    setStartDate: setCheckInDate,
    setEndDate: setCheckOutDate,
    excludeDates: datesToExclude
  });

  const [bookStay, {loading, error, data}] = useMutation(BOOK_STAY, {
    variables: {
      createBookingInput: {
        listingId,
        checkInDate,
        checkOutDate
      }
      // NOTE: for the scope of this project, we've opted for the simpler refetch approach to update the listing's bookings
      // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    },
    refetchQueries
  });

  if (error) {
    return (
      <Container title="Oh no! Booking incomplete.">
        <Box p="2">
          <Text>We couldn&apos;t complete your request.</Text>
          <Button
            colorScheme="blue"
            w="full"
            mt="2"
            onClick={() => window.location.reload()}
          >
            Book new dates
          </Button>
        </Box>
      </Container>
    );
  }

  if (userRole === 'Host') {
    return (
      <Container title="Not bookable as Host">
        <Box p="2">
          <Text>
            You can&apos;t book a listing while logged in as a host. To book
            this listing, please first logout and log back in as a guest.
          </Text>
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="blue"
            w="full"
            mt="2"
          >
            Log in as Guest
          </Button>
        </Box>
      </Container>
    );
  }

  if (data?.createBooking?.success === false) {
    return (
      <Container title="Oh no! Booking incomplete.">
        <Box p="2">
          <Text>{data?.createBooking?.message}</Text>
          <Button
            as={RouterLink}
            to="/wallet"
            colorScheme="blue"
            w="full"
            mt="2"
          >
            Add funds
          </Button>
        </Box>
      </Container>
    );
  }

  if (data) {
    const {checkInDate, checkOutDate} = data.createBooking.booking;

    return (
      <Container title="Booking successful!">
        <Box p="2" textAlign="center">
          <Text>You&apos;re staying here on</Text>
          <Text fontWeight="semibold">
            {checkInDate} - {checkOutDate}
          </Text>
          <Button
            as={RouterLink}
            to="/trips" // TODO: route to specific trip (need to add functionality to trips to view trip details)
            colorScheme="blue"
            w="full"
            mt="2"
          >
            Review booking
          </Button>
          <Link
            as="button"
            mt="2"
            textDecoration="underline"
            _hover={{
              textDecoration: 'none'
            }}
            onClick={() => window.location.reload()}
          >
            Book new dates
          </Link>
        </Box>
      </Container>
    );
  }

  return (
    <Container pos="relative" h="initial" title="Book your stay">
      <Box p="2">
        <Text fontWeight="semibold" fontSize="lg">
          Dates
        </Text>
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
              if (
                isDateValid(stringDates, date) &&
                areDatesValid(bookings, {start: checkInDate, end: date})
              ) {
                setCheckOutDate(date);
              }
            }}
          />
        </Flex>
        <Box mt="2">
          <Text fontWeight="semibold" fontSize="lg">
            Price
          </Text>
          <Text textAlign="center">
            ${costPerNight} x {numNights} nights ={' '}
            <Box as="span" fontWeight="semibold" fontSize="lg">
              ${costPerNight * numNights}
            </Box>
          </Text>
        </Box>
        <Button
          colorScheme="blue"
          w="calc(100% - 16px)" // subtract box padding (2 = 8px)
          pos="absolute"
          bottom="2" // compensate for box padding
          // center button horizontally
          left="50%"
          transform="translateX(-50%)"
          onClick={bookStay}
          disabled={numNights < 1}
          isLoading={loading}
        >
          Book trip
        </Button>
      </Box>
    </Container>
  );
}

BookStay.propTypes = {
  costPerNight: PropTypes.number,
  bookings: PropTypes.array.isRequired,
  listingId: PropTypes.string.isRequired,
  refetchQueries: PropTypes.array,
  userRole: PropTypes.string
};

function Container({title, children, ...props}) {
  return (
    <Box
      ml="4"
      w="300px"
      maxH="300px"
      h="fit-content"
      borderWidth="2px"
      borderColor="gray.400"
      {...props}
    >
      <Box bg="gray.200" p="2" textAlign="center">
        <Text fontWeight="bold">{title}</Text>
      </Box>
      {children}
    </Box>
  );
}

Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node
};
