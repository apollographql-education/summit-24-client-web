import Layout from '../layouts/Layout';
import React from 'react';
import {Heading} from '@chakra-ui/react';
import {useLocation} from 'react-router-dom';
export default function Search() {
  console.log('search');

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const startDate = query.get('startDate');
  const endDate = query.get('endDate');
  const numOfBeds = query.get('numOfBeds');

  console.log(startDate, endDate, numOfBeds);
  return (
    <Layout>
      <Heading as="h1">Search</Heading>
    </Layout>
  );
}
