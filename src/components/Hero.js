import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';

export default function Hero({children}) {
  return (
    <Box bgColor="#1f1c27">
      <Box
        bgImage="url('https://source.unsplash.com/rdtkE1fHi6c/2000x600')"
        bgPos="center"
        bgRepeat="no-repeat"
        h="500px"
        minH="500px"
        maxW="2000px"
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
}

Hero.propTypes = {
  children: PropTypes.node
};
