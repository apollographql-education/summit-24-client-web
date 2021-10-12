import Logo from '../assets/logo2.svg';
import React, {useState} from 'react';
import {
  Button,
  Center,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Stack,
  Text
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

import {gql} from '@apollo/client';

export const FEATURED_LISTINGS = gql`
  mutation getFeaturedListings {
    me {
      title
      photoThumbnail
      numOfBeds
      overallRating
    }
  }
`;

export default function Login() {
  const [value, setValue] = useState('');
  const handleChange = event => setValue(event.target.value);

  function login() {
    localStorage.setItem('token', value);
  }

  return (
    <Container maxW="container.md">
      <Center as={Link} to="/" center width="100%" my="4">
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
      </Center>
      <Stack spacing={2}>
        <Heading as="h1" size="lg">
          Login
        </Heading>
        <Text mb="8px">Email:</Text>
        <Input
          onChange={handleChange}
          value={value}
          placeholder="enter your userId here!"
          size="lg"
        />
        <Button as={Link} to="profile" onClick={login}>
          Login
        </Button>
      </Stack>
    </Container>
  );
}
