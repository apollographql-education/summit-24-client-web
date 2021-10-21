import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import React from 'react';
import {Center, Spinner} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

export const LISTING = gql`
  query getListing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        id
        name
        category
      }
    }
  }
`;

export default function EditListing() {
  const {id} = useParams();

  const {loading, error, data} = useQuery(LISTING, {variables: {id}});

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    );
  }
  if (error) {
    return <div>uhoh error! {error.message}</div>;
  }

  const {
    title,
    description,
    numOfBeds,
    locationType,
    photoThumbnail,
    amenities,
    costPerNight
  } = data?.listing;

  const listingData = {
    title,
    description,
    numOfBeds,
    locationType,
    photoThumbnail,
    amenities,
    costPerNight
  };

  return (
    <Layout>
      <ListingForm listingData={listingData} listingId={data?.listing.id} />
    </Layout>
  );
}
