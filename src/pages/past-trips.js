import Layout from '../layouts/Layout';
import React from 'react';
import Trips from '../components/Trips';
import {Center, Spinner} from '@chakra-ui/react';
import {GUEST_TRIPS} from '../utils';
import {useQuery} from '@apollo/client';

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

  const pastTrips = data.guestBookings.filter(
    trip => trip.status === 'COMPLETED'
  );

  return (
    <Layout>
      <Trips trips={pastTrips} />
    </Layout>
  );
}
