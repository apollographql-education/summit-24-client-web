import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { BookStayContainer } from "./BookStayContainer";
import { DatePickerInput } from "./DatePickerInput";
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  areDatesValid,
  getDatesToExclude,
  getFirstValidDate,
  getNextDate,
  isDateValid,
} from "../utils/dates";
import differenceInDays from "date-fns/differenceInDays";

interface BookStayFormProps {
  onSubmit: (values: FormValues) => void;
  submitting: boolean;
  listing: {
    bookings: Array<{ checkInDate: string; checkOutDate: string } | null>;
    costPerNight: number;
  };
}

interface FormValues {
  checkInDate: Date;
  checkOutDate: Date;
}

export function BookStayForm({
  listing,
  onSubmit,
  submitting,
}: BookStayFormProps) {
  const searchQuery = new URLSearchParams(useLocation().search);
  const checkInDateStringFromUrl = searchQuery.get("checkInDate")!;
  const checkOutDateStringFromUrl = searchQuery.get("checkOutDate")!;
  const checkInDateFromUrl = new Date(checkInDateStringFromUrl);
  const checkOutDateFromUrl = new Date(checkOutDateStringFromUrl);

  const bookings = useMemo(
    () => listing.bookings.filter(Boolean) ?? [],
    [listing],
  );

  const { datesToExclude, stringDates } = useMemo(
    () =>
      bookings.filter(Boolean).reduce(
        (acc, curr) => {
          const { checkInDate, checkOutDate } = curr;
          const { dates, stringDates } = getDatesToExclude(
            checkInDate,
            checkOutDate,
          );

          acc.datesToExclude = [...acc.datesToExclude, ...dates];
          acc.stringDates = [...acc.stringDates, ...stringDates];

          return acc;
        },
        { datesToExclude: [], stringDates: [] } as {
          datesToExclude: Date[];
          stringDates: string[];
        },
      ),
    [bookings],
  );

  //   if the dates from the url are "invalid" dates, initialize to the first available date
  const [checkInDate, setCheckInDate] = useState(
    checkInDateStringFromUrl && isDateValid(stringDates, checkInDateFromUrl)
      ? new Date(checkInDateFromUrl)
      : getFirstValidDate(stringDates),
  );
  const [checkOutDate, setCheckOutDate] = useState(
    checkOutDateStringFromUrl && isDateValid(stringDates, checkOutDateFromUrl)
      ? new Date(checkOutDateFromUrl)
      : getNextDate(checkInDate),
  );
  const numNights = differenceInDays(checkOutDate, checkInDate);

  const today = new Date();

  return (
    <BookStayContainer pos="relative" h="initial" title="Book your stay">
      <Stack spacing="3">
        <Text fontWeight="semibold">Check-in Date</Text>
        <DatePickerInput
          today={today}
          startDate={checkInDate}
          endDate={checkOutDate}
          setStartDate={setCheckInDate}
          setEndDate={setCheckOutDate}
          excludeDates={datesToExclude}
          selected={checkInDate}
          onChange={(date) => {
            if (isDateValid(stringDates, date)) {
              setCheckInDate(date);

              const newCheckout = date > checkInDate ? date : checkInDate;
              setCheckOutDate(newCheckout);
            }
          }}
        />
        <Text fontWeight="semibold">Check-out Date</Text>
        <DatePickerInput
          today={today}
          startDate={checkInDate}
          endDate={checkOutDate}
          setStartDate={setCheckInDate}
          setEndDate={setCheckOutDate}
          excludeDates={datesToExclude}
          selected={checkOutDate}
          minDate={today < checkInDate ? checkInDate : today}
          onChange={(date) => {
            if (
              isDateValid(stringDates, date) &&
              areDatesValid(bookings, { start: checkInDate, end: date })
            ) {
              setCheckOutDate(date);
            }
          }}
        />
        <Text fontWeight="semibold">Pricing</Text>
        <Flex justifyContent="space-between">
          <Text>
            ¤ {listing.costPerNight} x {numNights} nights
          </Text>
          <Text fontWeight="semibold" fontSize="lg">
            ¤ {listing.costPerNight * numNights}
          </Text>
        </Flex>
        <Button
          colorScheme="blue"
          onClick={() => onSubmit({ checkInDate, checkOutDate })}
          isDisabled={numNights < 1}
          isLoading={submitting}
        >
          Book trip
        </Button>
      </Stack>
    </BookStayContainer>
  );
}
