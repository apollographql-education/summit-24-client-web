import Logo from '../assets/logo2.svg';
import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, Box, Button, Flex, HStack, Image, Text} from '@chakra-ui/react';
import {Link, NavLink} from 'react-router-dom';
import {useUser} from '../utils';

export default function Nav({isLight}) {
  const txtColor = isLight ? '#fff' : '#000';
  const {user} = useUser();

  return (
    <Box px="2" h="80px">
      <Flex direction="row" justify="space-between" align="center" p={4}>
        <Box as={Link} to="/">
          <HStack spacing="2">
            <Image
              boxSize="50px"
              objectFit="cover"
              src={Logo}
              alt="airlock logo"
            />
            <Text fontWeight="extrabold" fontSize="2xl">
              Airlock
            </Text>
          </HStack>
        </Box>
        <HStack spacing="2">
          {user && user.__typename === 'Guest' && (
            <Button
              as={NavLink}
              to="/trips"
              variant="ghost"
              textColor={txtColor}
            >
              My trips
            </Button>
          )}
          {user && user.__typename === 'Host' && (
            <Button
              as={NavLink}
              to="/listings"
              variant="ghost"
              textColor={txtColor}
            >
              My listings
            </Button>
          )}
          {user && (
            <Box as={Link} to="/profile">
              <Avatar
                name="profile"
                borderColor="white"
                borderWidth="1px"
                src={user.profilePicture}
              />
            </Box>
          )}
          {!user && (
            <Button as={NavLink} to="/login">
              Log in
            </Button>
          )}
        </HStack>
      </Flex>
    </Box>
  );
}

Nav.propTypes = {
  isLight: PropTypes.bool
};
