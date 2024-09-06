import { ReactNode, useMemo, useState } from "react";
import differenceInDays from "date-fns/differenceInDays";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  StackProps,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  areDatesValid,
  getDatesToExclude,
  getFirstValidDate,
  getNextDate,
  isDateValid,
} from "../utils";
import {
  gql,
  useMutation,
  TypedDocumentNode,
  MutationHookOptions,
} from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  BookStayMutation,
  BookStayMutationVariables,
  CurrentUserIdQuery,
} from "./__generated__/BookStay.types";
import { DatePickerInput } from "./DatePickerInput";
import { Guest } from "../__generated__/types";

export const BOOK_STAY: TypedDocumentNode<
  BookStayMutation,
  BookStayMutationVariables
> = gql`
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

interface BookStayProps {
  costPerNight: number;
  bookings: Array<{ checkInDate: string; checkOutDate: string }>;
  listingId: string;
  refetchQueries?: MutationHookOptions["refetchQueries"];
  userRole?: string;
}

export default function BookStay({
  costPerNight,
  bookings,
  listingId,
  refetchQueries,
  userRole,
}: BookStayProps) {
  // get initial dates from url
  const searchQuery = new URLSearchParams(useLocation().search);
  const checkInDateStringFromUrl = searchQuery.get("checkInDate")!;
  const checkOutDateStringFromUrl = searchQuery.get("checkOutDate")!;
  const checkInDateFromUrl = new Date(checkInDateStringFromUrl);
  const checkOutDateFromUrl = new Date(checkOutDateStringFromUrl);

  //   arrays of dates (in Date and string formats) that are already booked
  const { datesToExclude, stringDates } = useMemo(
    () =>
      bookings.reduce(
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

  const [bookStay, { loading, error, data }] = useMutation(BOOK_STAY, {
    variables: {
      createBookingInput: {
        listingId,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      },
      // NOTE: for the scope of this project, we've opted for the simpler refetch approach to update the listing's bookings
      // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
    },
    refetchQueries,
    update: (cache) => {
      /* We will update the cache here */
    },
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

  if (userRole === undefined) {
    return (
      <Container title="You must be logged in">
        <Stack spacing="4">
          <Text>
            You can&apos;t book a stay without being logged in as a guest.
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
        </Stack>
      </Container>
    );
  }

  if (userRole === "Host") {
    return (
      <Container title="Not bookable as Host">
        <Stack spacing="3">
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
        </Stack>
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
            mt="4"
          >
            Add funds
          </Button>
          <Link
            as="button"
            mt="2"
            alignSelf="center"
            textDecoration="underline"
            _hover={{
              textDecoration: "none",
            }}
            onClick={() => window.location.reload()}
          >
            Book new dates
          </Link>
        </Box>
      </Container>
    );
  }

  if (data) {
    const { checkInDate, checkOutDate } = data.createBooking.booking!;

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
              textDecoration: "none",
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
            ¤ {costPerNight} x {numNights} nights
          </Text>
          <Text fontWeight="semibold" fontSize="lg">
            ¤ {costPerNight * numNights}
          </Text>
        </Flex>
        <Button
          colorScheme="blue"
          onClick={() => bookStay()}
          isDisabled={numNights < 1}
          isLoading={loading}
        >
          Book trip
        </Button>
      </Stack>
    </Container>
  );
}

interface ContainerProps extends StackProps {
  title?: string;
  children?: ReactNode;
}

function Container({ title, children, ...props }: ContainerProps) {
  return (
    <Stack
      p="4"
      w="300px"
      maxHeight="fit-content"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="8px"
      css={{ height: "fit-content" }}
      {...props}
    >
      <Heading as="h2" size="md" fontWeight="bold" mb="4">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}
