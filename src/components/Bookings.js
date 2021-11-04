import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Heading, Link, Text, VStack} from '@chakra-ui/react';
import {
  Content,
  Image,
  InnerContainer,
  ListingReviews,
  OuterContainer
} from './Card';
import {HOST_BOOKINGS, SUBMIT_REVIEW} from '../pages/past-bookings';
import {Link as RouterLink, useLocation, useParams} from 'react-router-dom';
import {useToggle} from 'react-use';

function Booking({booking, listingTitle, isPast}) {
  const [isOpen, toggleOpen] = useToggle(false);
  const hasHostReview = booking.guestReview;
  const title = booking.listing?.title || listingTitle;
  const graphqlVariables = {listingId: booking.listing.id, status: 'COMPLETED'};

  return (
    <OuterContainer>
      <InnerContainer p="3" isPast={isPast} toggleOpen={toggleOpen}>
        <Image
          src={booking.guest.profilePicture}
          name={booking.guest.name}
          w="auto"
        />
        <Flex justifyContent="space-between" boxSize="full" ml="3">
          <Content
            title={booking.guest.name}
            checkInDate={booking.checkInDate}
            checkOutDate={booking.checkOutDate}
            hasReviews={hasHostReview}
            isPast={isPast}
            isOpen={isOpen}
          >
            {booking.status === 'CURRENT' ? (
              <Box w="max-content">
                <Text fontWeight="semibold" fontStyle="italic">
                  Current guest
                </Text>
              </Box>
            ) : null}
          </Content>
        </Flex>
      </InnerContainer>
      {isPast ? (
        <ListingReviews
          isOpen={isOpen}
          title={title}
          isPast={isPast}
          trip={booking}
          mutationConfig={{
            mutation: SUBMIT_REVIEW,
            mutationOptions: {
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
            }
          }}
        />
      ) : null}
    </OuterContainer>
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
