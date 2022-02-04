import PropTypes from 'prop-types';
import React from 'react';
import {Flex} from '@chakra-ui/react';

export function InnerContainer({isPast, toggleOpen, children, ...props}) {
  return (
    <Flex
      as="button"
      boxSizing="border-box"
      w="full"
      alignItems="center"
      _hover={{
        background: isPast && 'gray.100'
      }}
      _disabled={{
        cursor: 'default'
      }}
      onClick={toggleOpen}
      disabled={!isPast}
      {...props}
    >
      {children}
    </Flex>
  );
}

InnerContainer.propTypes = {
  isPast: PropTypes.bool,
  toggleOpen: PropTypes.func,
  children: PropTypes.node
};
