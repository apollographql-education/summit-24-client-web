import Layout from '../layouts/Layout';
import ListingCell from '../components/ListingCell';
import React from 'react';
import {Heading, VStack} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const HOST_LISTINGS = gql`
  query getHostListings {
    hostListings {
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
