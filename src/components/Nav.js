import React from 'react';
import {Avatar, Box, Button, Flex, HStack, Image} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

export default function Nav() {
  return (
    <Box>
      <Flex direction="row" justify="space-between" align="center" p={4}>
        <Box as={Link} to="/">
          <Image
            boxSize="50px"
            objectFit="cover"
            src="https://bit.ly/sage-adebayo"
            alt="airlock logo"
          />
        </Box>
        <HStack spacing="2">
          <Button as={Link} to="/trips">
            My trips
          </Button>
          <Button as={Link} to="/trips">
            My listings
          </Button>
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </HStack>
      </Flex>
    </Box>
  );
}
