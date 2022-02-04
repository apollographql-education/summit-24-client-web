import PropTypes from 'prop-types';
import React from 'react';
import {Box, Button, Flex, Heading, Text} from '@chakra-ui/react';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';

export function Content({
  title,
  checkInDate,
  checkOutDate,
  hasReviews,
  isPast,
  isOpen,
  children,
  wrapperProps
}) {
  return (
    <>
      <Flex direction="column" alignItems="flex-start" {...wrapperProps}>
        <Heading as="h2" size="md" fontWeight="semibold">
          {title}
        </Heading>
        <Text mt="auto">
          {checkInDate} - {checkOutDate}
        </Text>
      </Flex>
      {children}
      {hasReviews ? (
        <Box
          as={isOpen ? IoChevronUp : IoChevronDown}
          alignSelf="center"
          boxSize="1.5em"
        />
      ) : (
        isPast && (
          <Button as="p" variant="ghost">
            {isOpen ? 'Cancel' : 'Leave a Review'}
          </Button>
        )
      )}
    </>
  );
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  checkInDate: PropTypes.string.isRequired,
  checkOutDate: PropTypes.string.isRequired,
  hasReviews: PropTypes.bool,
  isPast: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
  wrapperProps: PropTypes.object
};
