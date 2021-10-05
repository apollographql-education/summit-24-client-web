import Hero from '../components/Hero';
import Layout from '../layouts/Layout';
import Nav from '../components/Nav';
import React from 'react';
import {Container, Heading} from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Hero>
        <Nav isLight />
        <Container maxW="container.xl">
          <Heading as="h1" textColor="white">
            Home
          </Heading>
        </Container>
      </Hero>
      <Layout noNav>Content</Layout>
    </div>
  );
}
