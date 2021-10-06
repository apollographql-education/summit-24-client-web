import Logo from '../assets/logo2.svg';
import React from 'react';
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

export default function Login() {
  function login() {
    console.log('Clicked');
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
        <Input placeholder="enter your email address in here!" size="lg" />
        <Button onClick={login}>Login</Button>
      </Stack>
    </Container>
  );
}
