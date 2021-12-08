import BookStay from '../components/BookStay';
import Layout from '../layouts/Layout';
import LocationType from '../components/LocationType';
import QueryResult from '../components/QueryResult';
import React from 'react';
import Stars from '../components/Stars';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  Stack,
  StackDivider,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import {GUEST_TRIPS} from './trips';
import {IoBed, IoCreate} from 'react-icons/io5';
import {Link, useParams} from 'react-router-dom';
import {gql, useQuery} from '@apollo/client';
import {useUser} from '../utils';

export const LISTING = gql`
  query GetListing($id: ID!) {
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
        id
        name
        profilePicture
        profileDescription
        overallRating
      }
      bookings {
        checkInDate
        checkOutDate
      }
    }
  }
`;
export default function Listings() {
  const {id} = useParams();
  const {user} = useUser();
  const {loading, error, data} = useQuery(LISTING, {variables: {id}});

  return (
    <Layout>
      <QueryResult loading={loading} error={error} data={data}>
        {data => {
          const {
            id,
            title,
            description,
            numOfBeds,
            locationType,
            photoThumbnail,
            amenities,
            host,
            reviews,
            overallRating,
            costPerNight,
            bookings
          } = data?.listing;

          return (
            <Stack direction="column" spacing="6" mb="12">
              <Image
                src={photoThumbnail}
                alt={title}
                objectFit="cover"
                width="100%"
                height="200px"
                maxH="200px"
              />
              <Flex direction="row">
                <Stack flex="1" direction="column" spacing="6">
                  <Flex>
                    <Heading as="h1" size="lg">
                      {title}
                    </Heading>
                    {host && user && host.id === user.id && (
                      <Button
                        as={Link}
                        to={`/listing/${id}/edit`}
                        rightIcon={<IoCreate size={20} />}
                        ml="4"
                      >
                        Edit your listing
                      </Button>
                    )}
                  </Flex>
                  {overallRating ? (
                    <Stars size={20} rating={overallRating} />
                  ) : (
                    <Text>No reviews yet</Text>
                  )}
                  <Flex direction="row" justify="space-between">
                    <Text fontSize="lg" fontWeight="regular" mr="1">
                      {description}
                    </Text>
                  </Flex>
                  <Stack direction="row" spacing="4" align="center">
                    <Stack spacing="0.5">
                      <Text fontWeight="bold">Number of beds</Text>
                      <Stack direction="row" align="center">
                        <Text fontSize="lg" fontWeight="semibold" mr="1">
                          {numOfBeds}
                        </Text>
                        <IoBed size={22} />
                      </Stack>
                    </Stack>
                    <Stack spacing="0.5">
                      <Text fontWeight="bold">Location Type </Text>
                      <Stack direction="row" align="center">
                        <LocationType locType={locationType} size="22px" />
                        <Text
                          fontSize="lg"
                          casing="lowercase"
                          fontWeight="semibold"
                          ml="1"
                        >
                          {locationType}
                        </Text>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Amenities
                    </Heading>
                    <UnorderedList>
                      {amenities.map(({name}) => (
                        <ListItem key={name}>{name}</ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      About your host
                    </Heading>
                    <Flex align="flex-start">
                      <Stack>
                        <Avatar
                          name="profile"
                          size="md"
                          borderColor="white"
                          borderWidth="1px"
                          src={host.profilePicture}
                        />
                        <Text fontWeight="semibold">{host.name}</Text>
                      </Stack>
                      <Stack pl={4}>
                        <Stars size={16} rating={host.overallRating} />
                        <Text>{host.profileDescription}</Text>
                      </Stack>
                    </Flex>
                  </Box>
                  <Box>
                    <Heading as="h2" size="md" mb="2">
                      Reviews
                    </Heading>
                    <Stack
                      direction="column"
                      spacing="4"
                      divider={<StackDivider borderColor="gray.200" />}
                    >
                      {reviews.length === 0 ? (
                        <Text>No reviews yet</Text>
                      ) : (
                        reviews.map(({text, author, rating}) => (
                          <Stack direction="column" spacing="1" key={text}>
                            <Heading size="sm">{author.name}</Heading>
                            <Stars size={16} rating={rating} />
                            <Text>{text}</Text>
                          </Stack>
                        ))
                      )}
                    </Stack>
                  </Box>
                </Stack>
                <BookStay
                  costPerNight={costPerNight}
                  bookings={bookings}
                  listingId={id}
                  refetchQueries={[{query: LISTING}, {query: GUEST_TRIPS}]}
                />
              </Flex>
            </Stack>
          );
        }}
      </QueryResult>
    </Layout>
  );
}
