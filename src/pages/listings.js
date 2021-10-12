import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import React from 'react';
import {Button, Heading, VStack} from '@chakra-ui/react';
import {IoAddCircle} from 'react-icons/io5';
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
      <Button rightIcon={<IoAddCircle />}>Add Listing</Button>
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
