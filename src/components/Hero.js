import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';

export default function Hero({children}) {
  return (
    <Box bgColor="#1f1c27">
      <Box
        bgColor="indigo.darkest"
        bgPos="center"
        bgRepeat="no-repeat"
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
