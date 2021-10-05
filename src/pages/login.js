import React from 'react';
import {Button, Container, Heading, Input, Stack, Text} from '@chakra-ui/react';

export default function Login() {
  function clicked() {
    console.log('Clicked');
  }

  return (
    <Container maxW="container.md">
      <Stack spacing={2}>
        <Heading as="h1">Login</Heading>
        <Text mb="8px">Email:</Text>
        <Input placeholder="enter your email address in here!" size="lg" />
        <Button
          onClick={() => {
            clicked();
          }}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
}
