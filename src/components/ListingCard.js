import PropTypes from 'prop-types';
import React from 'react';
import Stars from './Stars';
import {Box, Flex, Heading, Image, Text} from '@chakra-ui/react';
import {IoBed} from 'react-icons/io5';
import {Link} from 'react-router-dom';

export default function ListingCard({
  id,
  title,
  photoThumbnail,
  numOfBeds,
  overallRating
}) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      _hover={{
        background: 'gray.100',
        cursor: 'pointer'
      }}
      as={Link}
      to={`/listing/${id}`}
    >
      <Image
        src={photoThumbnail}
        alt={title}
        boxSize="100%"
        maxH="200px"
        objectFit="cover"
      />
      <Flex direction="column" p="3" justify="space-between" minH="120px">
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Flex direction="row" justify="space-between">
          <Flex direction="row" align="center">
            <Text fontSize="lg" fontWeight="bold" mr="1">
              {numOfBeds}
            </Text>
            <IoBed size={22} />
          </Flex>
          {overallRating && <Stars size={20} rating={overallRating} />}
        </Flex>
      </Flex>
    </Box>
  );
}

ListingCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photoThumbnail: PropTypes.string,
  numOfBeds: PropTypes.number.isRequired,
  overallRating: PropTypes.number
};
