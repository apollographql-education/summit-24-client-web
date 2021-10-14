import PropTypes from 'prop-types';
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Tag,
  Text,
  VStack
} from '@chakra-ui/react';
import {Link as RouterLink, useLocation} from 'react-router-dom';

export default function Trips({trips}) {
  const {pathname} = useLocation();
  return (
    <>
      <Heading as="h1" mb="4">
        My Trips
      </Heading>
      <Box
        as="nav"
        w="full"
        mb="4"
        fontSize="lg"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
      >
        <Link
          as={RouterLink}
          to="/trips"
          mr="8"
          fontWeight={pathname === '/trips' ? 'bold' : 'normal'}
        >
          My Trips
        </Link>
        <Link
          as={RouterLink}
          to="/past-trips"
          fontWeight={pathname === '/past-trips' ? 'bold' : 'normal'}
        >
          Past Trips
        </Link>
      </Box>

      <VStack spacing="4">
        {trips.map((trip, i) => (
          <Flex
            key={`${trip.listing.title}-${i}`}
            boxSizing="border-box"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            width="100%"
            h="100px"
            mb="2"
            _hover={{
              background: 'gray.100',
              cursor: 'pointer'
            }}
          >
            <Image
              src={trip.listing.photoThumbnail}
              alt={trip.listing.title}
              w="100px"
            />
            <Flex w="full" p="3">
              <Flex w="full" direction="column">
                <Heading as="h2" size="md" fontWeight="semibold">
                  {trip.listing.title}
                </Heading>
                <Text fontSize="lg" mt="auto">
                  {trip.checkInDate} - {trip.checkOutDate}
                </Text>
              </Flex>
              {trip.status === 'CURRENT' ? (
                <Tag
                  h="18px"
                  w="300px"
                  rounded="xl"
                  bgColor="#425C0A"
                  color="white"
                  justifyContent="center"
                >
                  You&apos;re staying here right now!
                </Tag>
              ) : null}
            </Flex>
          </Flex>
        ))}
      </VStack>
    </>
  );
}

Trips.propTypes = {
  trips: PropTypes.array.isRequired
};
