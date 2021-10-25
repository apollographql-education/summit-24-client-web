import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import React from 'react';
import {Button, Center, Spinner} from '@chakra-ui/react';
import {IoArrowBackOutline} from 'react-icons/io5';
import {Link, useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';

export const EDIT_LISTING = gql`
  mutation UpdateListingMutation(
    $listingId: ID!
    $listing: UpdateListingInput!
  ) {
    updateListing(listingId: $listingId, listing: $listing) {
      success
      message
      listing {
        id
        title
        description
        photoThumbnail
        numOfBeds
        costPerNight
        locationType
        amenities {
          id
          category
          name
        }
      }
    }
  }
`;

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
      <Button as={Link} to="./" leftIcon={<IoArrowBackOutline />} mb="4">
        Back
      </Button>
      <ListingForm
        listingData={listingData}
        listingId={data?.listing.id}
        mutation={EDIT_LISTING}
      />
    </Layout>
  );
}
