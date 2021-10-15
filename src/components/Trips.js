import PropTypes from 'prop-types';
import React from 'react';
import TripReviews from './TripReviews';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Tag,
  Text,
  VStack
} from '@chakra-ui/react';
import {Link as RouterLink, useLocation} from 'react-router-dom';

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

      <Accordion allowToggle allowMultiple>
        <VStack spacing="4">
          {trips.map((trip, i) => {
            const hasReviews = trip.locationReview && trip.hostReview;
            return (
              <AccordionItem
                key={`${trip.listing.title}-${i}`}
                isDisabled={!isPast}
                w="full"
                borderWidth="1px"
                borderColor="gray.200"
                overflow="hidden"
              >
                {({isExpanded}) => (
                  <>
                    <AccordionButton
                      p="0"
                      _disabled={{opacity: 1, cursor: 'unset'}}
                    >
                      <Flex
                        boxSizing="border-box"
                        w="full"
                        h="100px"
                        _hover={{
                          background: 'gray.100',
                          cursor: 'pointer'
                        }}
                      >
                        <Image
                          src={trip.listing.photoThumbnail}
                          alt={trip.listing.title}
                          w="100px"
                        />
                        <Flex w="full" p="3">
                          <Flex
                            w="full"
                            direction="column"
                            alignItems="flex-start"
                          >
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
                            <AccordionIcon alignSelf="center" boxSize="1.5em" />
                          ) : (
                            isPast && (
                              <Button variant="ghost">
                                {isExpanded ? 'Cancel' : 'Leave a Review'}
                              </Button>
                            )
                          )}
                        </Flex>
                      </Flex>
                    </AccordionButton>

                    {isPast ? (
                      <AccordionPanel py="4">
                        <TripReviews
                          bookingId={trip.id}
                          ratingKey={`${trip.listing.title}`}
                          location={trip.listing.title}
                          locationReview={trip.locationReview}
                          hostReview={trip.hostReview}
                          guestReview={trip.guestReview}
                          isPastTrip={isPast}
                        />
                      </AccordionPanel>
                    ) : null}
                  </>
                )}
              </AccordionItem>
            );
          })}
        </VStack>
      </Accordion>
    </>
  );
}

Trips.propTypes = {
  trips: PropTypes.array.isRequired,
  isPast: PropTypes.bool
};
