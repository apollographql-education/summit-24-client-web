import Layout from '../layouts/Layout';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import {HOST_LISTINGS} from '../utils';
import {IoAddCircle, IoStar} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';

const LINK_PROPS = {
  as: Link,
  mr: '4',
  textDecoration: 'underline',
  _hover: {
    textDecoration: 'none'
  }
};

export default function Listings() {
  const {loading, error, data} = useQuery(HOST_LISTINGS);

  return (
    <Layout>
      <Heading as="h1" mb="4">
        My Listings
      </Heading>
      <Flex w="full" justifyContent="flex-end">
        <Button
          as={Link}
          to="/listings/create"
          rightIcon={<IoAddCircle />}
          mb="4"
          colorScheme="blue"
        >
          Add Listing
        </Button>
      </Flex>
      <QueryResult loading={loading} error={error} data={data}>
        {({hostListings}) => {
          return (
            <VStack spacing="4">
              {hostListings.map((listingData, index) => {
                const {
                  id,
                  title,
                  photoThumbnail,
                  overallRating,
                  numberOfUpcomingBookings
                } = listingData;
                return (
                  <Box
                    key={`${title}-${index}`}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    w="full"
                  >
                    <Flex direction="row" justify="space-between" h="100px">
                      <Image
                        src={photoThumbnail}
                        alt={title}
                        objectFit="cover"
                        w="150px"
                        h="full"
                        maxW="150px"
                      />
                      <Flex
                        boxSize="full"
                        p="4"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex
                          direction="column"
                          justify="space-around"
                          h="full"
                        >
                          <Flex
                            direction="column"
                            justify="space-between"
                            h="full"
                          >
                            <Heading as="h2" size="md">
                              {title}
                            </Heading>
                            <Flex>
                              <Text>{numberOfUpcomingBookings} bookings</Text>
                              {overallRating ? (
                                <Flex alignItems="center" ml="4">
                                  {overallRating} <Box as={IoStar} ml="1" />
                                </Flex>
                              ) : (
                                <Text ml="4">No ratings yet</Text>
                              )}
                            </Flex>
                          </Flex>
                        </Flex>

                        <Flex>
                          <Box {...LINK_PROPS} to={`/listing/${id}/edit`}>
                            Edit
                          </Box>
                          <Box {...LINK_PROPS} to={`/listing/${id}`}>
                            View
                          </Box>
                          <Box {...LINK_PROPS} to={`/listing/${id}/bookings`}>
                            Manage Bookings
                          </Box>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                );
              })}
            </VStack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}
