import Layout from '../layouts/Layout';
import LocationType from '../components/LocationType';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import {IoBed} from 'react-icons/io5';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';

export const LISTING = gql`
  query getListing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        name
      }
      overallRating
      reviews {
        text
        author {
          name
        }
        rating
      }
      host {
        name
        profilePicture
        profileDescription
        overallRating
      }
    }
  }
`;
export default function Listings() {
  const {id} = useParams();
  const {loading, error, data} = useQuery(LISTING, {variables: {id}});
  if (loading) return 'Loading...';
  if (error) return `uhoh error! ${error.message}`;
  const {
    title,
    description,
    numOfBeds,
    locationType,
    photoThumbnail,
    amenities
  } = data?.listing;
  return (
    <Layout>
      {data && (
        <Stack direction="column" spacing="4">
          <Image
            src={photoThumbnail}
            alt={title}
            objectFit="cover"
            width="100%"
            height="200px"
            maxH="200px"
          />
          <Heading as="h1" size="xl" mb="4">
            {title}
          </Heading>
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
          </Flex>
          <Box>
            <Heading as="h2" size="lg" mb="2">
              Amenities
            </Heading>
            <UnorderedList>
              {amenities.map(({name}) => (
                <ListItem key={name}>{name}</ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb="2">
              Host
            </Heading>
          </Box>
          <Box>
            <Heading as="h2" size="lg" mb="2">
              Reviews
            </Heading>
          </Box>
        </Stack>
      )}
    </Layout>
  );
}
