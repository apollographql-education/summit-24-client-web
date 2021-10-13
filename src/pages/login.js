import Logo from '../assets/logo2.svg';
import React, {useState} from 'react';
import {
  Button,
  Center,
  Container,
  Divider,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';

export default function Login() {
  const [value, setValue] = useState();
  const handleChange = event => setValue(event.target.value);
  const userIds = [
    'user-1',
    'user-2',
    'user-3',
    'user-4',
    'user-5',
    'user-6',
    'user-7',
    'user-8',
    'user-9',
    'user-10'
  ];
  function login() {
    localStorage.setItem('token', value);
  }

  return (
    <Container maxW="container.md">
      <Center as={Link} to="/" width="100%" my="4">
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
      <Stack spacing={4}>
        <Heading as="h1" size="lg">
          Login
        </Heading>
        <Stack spacing={1}>
          <Select
            onChange={handleChange}
            placeholder="Select a userId"
            value={value}
          >
            {userIds.map(userId => (
              <option key={userId} value={userId}>
                {userId}
              </option>
            ))}
          </Select>
          <Text fontSize="xs" color="gray.600">
            With this demo site you can play around with different user profiles
          </Text>
        </Stack>
        <Divider />
        <Input
          onChange={handleChange}
          value={value}
          placeholder="Type in the userId here"
          size="lg"
        />
        <Button
          onClick={e => {
            value ? login() : e.preventDefault();
          }}
          isDisabled={!value}
        >
          Login
        </Button>
      </Stack>
    </Container>
  );
}
