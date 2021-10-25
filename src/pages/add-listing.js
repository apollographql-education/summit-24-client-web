import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import React from 'react';
import {Button} from '@chakra-ui/react';
import {IoArrowBackOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {gql} from '@apollo/client';

export const CREATE_LISTING = gql`
  mutation CreateListingMutation($listing: CreateListingInput!) {
    createListing(listing: $listing) {
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

export default function CreateListing() {
  return (
    <Layout>
      <Button as={Link} to="/listings" leftIcon={<IoArrowBackOutline />} mb="4">
        Back to listings
      </Button>
      <ListingForm mutation={CREATE_LISTING} />
    </Layout>
  );
}
