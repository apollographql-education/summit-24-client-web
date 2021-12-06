import Logo from '../assets/logo2.svg';
import React, {useState} from 'react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Heading,
  Image,
  Select,
  Spacer,
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
    <>
      <Box as={Link} to="/" width="100%">
        <HStack spacing="2" p="4">
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
      <Container maxW="container.md">
        <Stack spacing={4}>
          <Heading as="h1" size="md">
            Choose a user role
          </Heading>
          <Flex>
            <Button
              as={Link}
              to="/"
              flex="1"
              mr="16"
              onClick={() => {
                setValue('user-1');
                login();
              }}
            >
              Log in as host
            </Button>
            <Button
              as={Link}
              to="/"
              flex="1"
              onClick={() => {
                setValue('user-2');
                login();
              }}
            >
              Log in as guest
            </Button>
          </Flex>
          <Spacer />
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    More users
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
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
                  With this demo site you can play around with different user
                  profiles
                </Text>
                <Button
                  as={Link}
                  to="/"
                  onClick={e => {
                    value ? login() : e.preventDefault();
                  }}
                  isDisabled={!value}
                >
                  Login
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </>
  );
}
