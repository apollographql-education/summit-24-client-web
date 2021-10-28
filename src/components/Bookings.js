import PropTypes from 'prop-types';
import React from 'react';
import TripReviews from './TripReviews';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import {HOST_BOOKINGS, SUBMIT_REVIEW} from '../pages/past-bookings';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';
import {Link as RouterLink, useLocation, useParams} from 'react-router-dom';
import {useToggle} from 'react-use';

function Booking({booking, listingTitle, isPast}) {
  const [isOpen, toggleOpen] = useToggle(false);
  const hasHostReview = booking.guestReview;
  const title = booking.listing?.title || listingTitle;
  const graphqlVariables = {listingId: booking.listing.id, status: 'COMPLETED'};

  return (
    <Box w="full" borderWidth="1px" borderColor="gray.200">
      <Flex
        as="button"
        boxSizing="border-box"
        w="full"
        h="100px"
        p="3"
        _hover={{
          background: isPast && 'gray.100'
        }}
        _disabled={{
          cursor: 'default'
        }}
        onClick={toggleOpen}
        disabled={!isPast}
      >
        <Avatar
          src={booking.guest.profilePicture}
          name={booking.guest.name}
          h="full"
          w="auto"
        />
        <Flex justifyContent="space-between" boxSize="full" ml="3">
          <Flex direction="column" alignItems="flex-start">
            <Heading as="h2" size="md" fontWeight="semibold">
              {booking.guest.name}
            </Heading>
            <Text fontSize="lg" mt="auto">
              {booking.checkInDate} - {booking.checkOutDate}
            </Text>
          </Flex>
          {booking.status === 'CURRENT' ? (
            <Box w="max-content">
              <Text fontWeight="semibold" fontStyle="italic">
                Current guest
              </Text>
            </Box>
          ) : null}
          {hasHostReview ? (
            <Box
              as={isOpen ? IoChevronUp : IoChevronDown}
              alignSelf="center"
              boxSize="1.5em"
            />
          ) : (
            isPast && (
              <Button as="p" variant="ghost">
                {isOpen ? 'Cancel' : 'Leave a Review'}
              </Button>
            )
          )}
        </Flex>
      </Flex>
      {isPast ? (
        <Collapse in={isOpen} py="4">
          <TripReviews
            ratingKey={title}
            location={title}
            locationReview={booking.locationReview}
            hostReview={booking.hostReview}
            guestReview={booking.guestReview}
            isPastTrip={isPast}
            isHost
            mutation={SUBMIT_REVIEW}
            mutationOptions={{
              variables: {
                ...graphqlVariables,
                bookingId: booking.id
              },
              // NOTE: for the scope of this project, we've opted for the simpler refetch approach
              // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
              refetchQueries: [
                {
                  query: HOST_BOOKINGS,
                  variables: graphqlVariables
                }
              ]
            }}
          />
        </Collapse>
      ) : null}
    </Box>
  );
}

Booking.propTypes = {
  booking: PropTypes.object,
  isPast: PropTypes.bool,
  listingTitle: PropTypes.string
};

export default function Bookings({title, bookings, isPast = false}) {
  const {pathname} = useLocation();
  const {id} = useParams();

  return (
    <>
      <Heading as="h1" mb="4">
        {title}
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to={`/listing/${id}/bookings`}
          mr="8"
          fontWeight={
            pathname === `/listing/${id}/bookings` ? 'bold' : 'normal'
          }
        >
          Upcoming Bookings
        </Link>
        <Link
          as={RouterLink}
          to={`/listing/${id}/past-bookings`}
          fontWeight={
            pathname === `/listing/${id}/past-bookings` ? 'bold' : 'normal'
          }
        >
          Past Bookings
        </Link>
      </Box>

      {bookings.length ? (
        <VStack spacing="4">
          {bookings.map((booking, i) => {
            return (
              <Booking
                key={`${title}-${i}`}
                booking={booking}
                listingTitle={title}
                isPast={isPast}
              />
            );
          })}
        </VStack>
      ) : (
        <Text textAlign="center">
          You have no {isPast ? 'previous' : 'current or upcoming'} bookings
        </Text>
      )}
    </>
  );
}

Bookings.propTypes = {
  title: PropTypes.string.isRequired,
  bookings: PropTypes.array.isRequired,
  isPast: PropTypes.bool
};
