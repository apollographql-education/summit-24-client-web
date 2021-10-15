import Layout from '../layouts/Layout';
import React from 'react';
import Trips from '../components/Trips';
import {Center, Spinner} from '@chakra-ui/react';
import {gql, useQuery} from '@apollo/client';

export const GUEST_TRIPS = gql`
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

  console.log(data.pastGuestBookings);

  const unreviewedTrip = {
    id: 'booking-1',
    checkInDate: 'Sep 1, 2021',
    checkOutDate: 'Sep 4, 2021',
    status: 'COMPLETED',
    listing: {
      title: 'Campsite on Moon',
      photoThumbnail: 'https://source.unsplash.com/featured/?space'
    },
    locationReview: null,
    hostReview: null,
    guestReview: null
  };

  return (
    <Layout>
      <Trips trips={[...data.pastGuestBookings, unreviewedTrip]} isPast />
    </Layout>
  );
}
