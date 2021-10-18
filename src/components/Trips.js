import PropTypes from 'prop-types';
import React from 'react';
import TripReviews from './TripReviews';
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Image,
  Link,
  Tag,
  Text,
  VStack
} from '@chakra-ui/react';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {useToggle} from 'react-use';

function Trip({trip, isPast}) {
  const [isOpen, toggleOpen] = useToggle(false);
  const hasReviews = trip.locationReview && trip.hostReview;

  return (
    <Box w="full" borderWidth="1px" borderColor="gray.200">
      <Flex
        as="button"
        boxSizing="border-box"
        w="full"
        h="100px"
        _hover={{
          background: isPast && 'gray.100'
        }}
        _disabled={{
          cursor: 'default'
        }}
        onClick={toggleOpen}
        disabled={!isPast}
      >
        <Image
          src={trip.listing.photoThumbnail}
          alt={trip.listing.title}
          w="100px"
          minW="100px"
          h="full"
        />
        <Flex boxSize="full" p="3">
          <Flex w="full" direction="column" alignItems="flex-start">
            <Heading as="h2" size="md" fontWeight="semibold">
              {trip.listing.title}
            </Heading>
            <Text fontSize="lg" mt="auto">
              {trip.checkInDate} - {trip.checkOutDate}
            </Text>
          </Flex>
          {trip.status === 'CURRENT' ? (
            <Tag
              h="18px"
              w="300px"
              rounded="xl"
              bgColor="#425C0A"
              color="white"
              justifyContent="center"
            >
              You&apos;re staying here right now!
            </Tag>
          ) : null}
          {hasReviews ? (
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
            bookingId={trip.id}
            ratingKey={`${trip.listing.title}`}
            location={trip.listing.title}
            locationReview={trip.locationReview}
            hostReview={trip.hostReview}
            guestReview={trip.guestReview}
            isPastTrip={isPast}
          />
        </Collapse>
      ) : null}
    </Box>
  );
}

Trip.propTypes = {
  trip: PropTypes.object,
  isPast: PropTypes.bool
};

export default function Trips({trips, isPast = false}) {
  const {pathname} = useLocation();

  return (
    <>
      <Heading as="h1" mb="4">
        My Trips
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
          to="/trips"
          mr="8"
          fontWeight={pathname === '/trips' ? 'bold' : 'normal'}
        >
          My Trips
        </Link>
        <Link
          as={RouterLink}
          to="/past-trips"
          fontWeight={pathname === '/past-trips' ? 'bold' : 'normal'}
        >
          Past Trips
        </Link>
      </Box>

      <VStack spacing="4">
        {trips.map((trip, i) => {
          return (
            <Trip
              key={`${trip.listing.title}-${i}`}
              trip={trip}
              isPast={isPast}
            />
          );
        })}
      </VStack>
    </>
  );
}

Trips.propTypes = {
  trips: PropTypes.array.isRequired,
  isPast: PropTypes.bool
};
