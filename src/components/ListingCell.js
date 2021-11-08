import LocationType from './LocationType';
import PropTypes from 'prop-types';
import React from 'react';
import Stars from './Stars';
import {Box, Flex, Heading, Image, Text} from '@chakra-ui/react';
import {IoBed} from 'react-icons/io5';
import {Link} from 'react-router-dom';

export default function ListingCell({
  title,
  photoThumbnail,
  description,
  numOfBeds,
  costPerNight,
  overallRating,
  locationType,
  to
}) {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      width="100%"
      _hover={{
        background: 'gray.100',
        cursor: 'pointer'
      }}
      as={Link}
      to={to}
      mb="2"
    >
      <Flex direction="row" justify="space-between" minH="120px" maxH="200px">
        <Image
          src={photoThumbnail}
          alt={title}
          objectFit="cover"
          width="250px"
          height="200px"
          maxH="200px"
          maxW="250px"
        />
        <Flex
          direction="column"
          m="3"
          justify="space-around"
          minH="120px"
          width="100%"
        >
          <Flex direction="row" justify="space-between">
            <Heading as="h2" size="md">
              {title}
            </Heading>
            <Text fontSize="lg" fontWeight="bold" mr="1">
              ${costPerNight} / night
            </Text>
          </Flex>
          <Flex direction="row" justify="space-between">
            <Text fontSize="lg" fontWeight="regular" mr="1">
              {description}
            </Text>
          </Flex>
          <Flex direction="row" justify="space-between">
            <Flex direction="row" align="center">
              <Text fontSize="lg" fontWeight="bold" mr="1">
                {numOfBeds}
              </Text>
              <IoBed size={22} />
              <Flex direction="row" align="center" ml="6">
                <LocationType locType={locationType} size="20px" />
                <Text
                  fontSize="lg"
                  casing="lowercase"
                  fontWeight="regular"
                  ml="1"
                >
                  {locationType}
                </Text>
              </Flex>
            </Flex>

            <Stars size={20} rating={overallRating} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

ListingCell.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  photoThumbnail: PropTypes.string,
  costPerNight: PropTypes.number,
  numOfBeds: PropTypes.number.isRequired,
  overallRating: PropTypes.number,
  locationType: PropTypes.string,
  to: PropTypes.string.isRequired
};
