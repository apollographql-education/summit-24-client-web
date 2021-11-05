import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Box, Flex, Input, Text} from '@chakra-ui/react';
import {
  areDatesValid,
  getDatePickerProps,
  getDatesToExclude,
  getFirstValidDate,
  isDateValid
} from '../utils';

import 'react-datepicker/dist/react-datepicker.css';

export default function BookStay({costPerNight, bookings}) {
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
              if (
                isDateValid(stringDates, date) &&
                areDatesValid(bookings, {start: checkInDate, end: date})
              ) {
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
