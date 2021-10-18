import CurrentTrips from '../components/Trips';
import Layout from '../layouts/Layout';
import React from 'react';
import {Center, Spinner} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const GUEST_TRIPS = gql`
  query getGuestTrips {
    upcomingGuestBookings {
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

export default function Trips() {
  const {loading, error, data} = useQuery(GUEST_TRIPS);

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
      <CurrentTrips trips={data.upcomingGuestBookings} />
    </Layout>
  );
}
