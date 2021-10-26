import Layout from '../layouts/Layout';
import ListingForm from '../components/ListingForm';
import QueryResult from '../components/QueryResult';
import React from 'react';
import {Button, Center, Spinner} from '@chakra-ui/react';
import {IoArrowBackOutline} from 'react-icons/io5';
import {LISTING_FRAGMENT} from '../utils';
import {Link, useHistory, useParams} from 'react-router-dom';
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
        ...ListingFragment
        amenities {
          id
          category
          name
        }
      }
    }
  }
  ${LISTING_FRAGMENT}
`;

export const LISTING = gql`
  query GetListing($id: ID!) {
    listing(id: $id) {
      ...ListingFragment
      amenities {
        id
        name
        category
      }
    }
  }
  ${LISTING_FRAGMENT}
`;

export default function EditListing() {
  const history = useHistory();
  const {id} = useParams();

  const {loading, error, data} = useQuery(LISTING, {variables: {id}});

  let listingData = {};
  let listingId = '';

  if (data) {
    const {
      id: listingID,
      title,
      description,
      numOfBeds,
      locationType,
      photoThumbnail,
      amenities,
      costPerNight
    } = data.listing;

    listingData = {
      title,
      description,
      numOfBeds,
      locationType,
      photoThumbnail,
      amenities,
      costPerNight
    };

    listingId = listingID;
  }

  return (
    <Layout>
      <Button as={Link} to="./" leftIcon={<IoArrowBackOutline />} mb="4">
        Back
      </Button>
      <QueryResult loading={loading} error={error} data={data}>
        <ListingForm
          listingData={listingData}
          listingId={listingId}
          mutation={EDIT_LISTING}
          mutationOptions={{
            onCompleted: () => {
              history.push(`/listing/${listingId}`);
            }
          }}
        />
      </QueryResult>
    </Layout>
  );
}
