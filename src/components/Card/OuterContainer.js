import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/react';

export function OuterContainer({children, ...props}) {
  return (
    <Box w="full" borderWidth="1px" borderColor="gray.200" {...props}>
      {children}
    </Box>
  );
}

OuterContainer.propTypes = {
  children: PropTypes.node
};
