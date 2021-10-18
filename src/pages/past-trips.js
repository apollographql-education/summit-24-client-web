import Layout from '../layouts/Layout';
import React from 'react';
import Trips from '../components/Trips';
import {Center, Spinner} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const PAST_GUEST_TRIPS = gql`
  query getPastTrips {
    pastGuestBookings {
      id
      checkInDate
      checkOutDate
      status
      listing {
        title
        photoThumbnail
      }
      locationReview {
        id
        text
        rating
      }
      hostReview {
        id
        text
        rating
      }
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export default function PastTrips() {
  const {loading, error, data} = useQuery(PAST_GUEST_TRIPS);

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

  return (
    <Layout>
      <Trips trips={data.pastGuestBookings} isPast />
    </Layout>
  );
}
