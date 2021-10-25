import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import React from 'react';
import {Button, Flex, Heading, VStack} from '@chakra-ui/react';
import {IoAddCircle} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

export const HOST_LISTINGS = gql`
  query getHostListings {
    hostListings {
      id
      title
      photoThumbnail
      numOfBeds
      description
      overallRating
      costPerNight
      locationType
    }
  }
`;
export default function Listings() {
  const {loading, error, data} = useQuery(HOST_LISTINGS);
  if (loading) return 'Loading...';
  if (error) return `uhoh error! ${error.message}`;
  return (
    <Layout>
      <Heading as="h1" mb="4">
        My Listings
      </Heading>
      <Flex w="full" justifyContent="flex-end">
        <Button
          as={Link}
          to="./create"
          rightIcon={<IoAddCircle />}
          mb="4"
          colorScheme="blue"
        >
          Add Listing
        </Button>
      </Flex>
      {data && (
        <VStack spacing="4">
          {data.hostListings.map((listingData, index) => (
            <ListingCell
              key={`${listingData.title}-${index}`}
              {...listingData}
            />
          ))}
        </VStack>
      )}
    </Layout>
  );
}
