import Logo from '../assets/logo2.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, Box, Button, Flex, HStack, Image, Text} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
export default function Nav({isLight}) {
  const txtColor = isLight ? '#fff' : '#000';
  return (
    <Box px="2">
      <Flex direction="row" justify="space-between" align="center" p={4}>
        <Box as={Link} to="/">
          <HStack spacing="2">
            <Image
              boxSize="50px"
              objectFit="cover"
              src={Logo}
              alt="airlock logo"
            />
            <Text fontWeight="extrabold" fontSize="2xl" textColor={txtColor}>
              Airlock
            </Text>
          </HStack>
        </Box>
        <HStack spacing="2">
          <Button as={Link} to="/trips" variant="ghost" textColor={txtColor}>
            My trips
          </Button>
          <Button as={Link} to="/listings" variant="ghost" textColor={txtColor}>
            My listings
          </Button>
          <Box as={Link} to="/profile">
            <Avatar
              name="profile"
              borderColor="white"
              borderWidth="1px"
              src="https://pbs.twimg.com/profile_images/1284178061257302016/RKIDqyJz_400x400.jpg"
            />
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

Nav.propTypes = {
  isLight: PropTypes.bool
};
