import PropTypes from 'prop-types';
import React from 'react';
import Stars from './Stars';
import {Flex, Heading, Image, Text} from '@chakra-ui/react';
import {IoBed} from 'react-icons/io5';
import {Link} from 'react-router-dom';
export default function ListingCard({
  id,
  title,
  photoThumbnail,
  numOfBeds,
  overallRating,
  locationType,
  costPerNight
}) {
  return (
    <Flex
      direction="column"
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
        borderRadius={3}
      />
      <Flex direction="column" p="3" justify="space-between" minH="120px">
        <Text
          fontSize="sm"
          fontWeight={600}
          casing="uppercase"
          color="grey.dark"
          fontFamily="Source Code Pro"
        >
          {locationType}
        </Text>
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Flex direction="row" justify="space-between">
          <Flex direction="row" align="center">
            {overallRating ? (
              <Stars size={20} rating={overallRating} />
            ) : (
              <Text>No reviews yet</Text>
            )}
            <Flex ml={6} align="center">
              <IoBed size={22} />
              <Text fontSize="lg" ml={1}>
                {numOfBeds}
              </Text>
            </Flex>
            <Flex fontSize="lg" ml={6}>
              <Text fontWeight="bold"> @{costPerNight}</Text> / night
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

ListingCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  photoThumbnail: PropTypes.string,
  numOfBeds: PropTypes.number.isRequired,
  overallRating: PropTypes.number,
  locationType: PropTypes.string.isRequired,
  costPerNight: PropTypes.number.isRequired
};
