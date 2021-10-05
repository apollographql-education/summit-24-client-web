import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';

export default function Hero({children}) {
  return (
    <div>
      <Box
        backgroundImage="url('https://source.unsplash.com/Knwea-mLGAg/2000x600')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        minHeight="500px"
      >
        {children}
      </Box>
    </div>
  );
}

Hero.propTypes = {
  children: PropTypes.node
};
