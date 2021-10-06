import Layout from '../layouts/Layout';
import React from 'react';
import {Heading} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';

export default function Listing() {
  const {id} = useParams();
  return (
    <Layout>
      <Heading as="h1">{id}</Heading>
    </Layout>
  );
}
