import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import React from 'react';
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
      <ListingForm mutation={CREATE_LISTING} />
    </Layout>
  );
}
