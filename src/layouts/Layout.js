import Nav from '../components/Nav';
import PropTypes from 'prop-types';
import React from 'react';
import {Container} from '@chakra-ui/react';

export default function Layout({noNav, children}) {
  return (
    <>
      {!noNav && <Nav />}
      <Container maxW="container.xl">{children}</Container>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  noNav: PropTypes.bool
};
