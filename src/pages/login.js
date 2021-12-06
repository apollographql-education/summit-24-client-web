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
  const users = [
    'Athes - Guest',
    'Kelle - Host',
    'Renie - Host',
    'Flinson - Host',
    'Cara - Guest',
    'Wardy - Guest',
    'Brise - Guest',
    'Hendav - Guest'
  ];
  const HOST_USER = 'user-1';
  const GUEST_USER = 'user-2';

  function login(userId) {
    const id = userId ? userId : value;
    localStorage.setItem('token', id);
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
                login(HOST_USER);
              }}
            >
              Log in as host
            </Button>
            <Button
              as={Link}
              to="/"
              flex="1"
              onClick={() => {
                login(GUEST_USER);
              }}
            >
              Log in as guest
            </Button>
          </Flex>
          <Spacer mt={16} />
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    More login options
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel py={4}>
                <Text fontSize="xs" color="gray.600">
                  Want to test out other accounts? Choose a user from the list!
                </Text>
                <Select
                  onChange={handleChange}
                  placeholder="Select a user"
                  value={value}
                >
                  {users.map((userId, index) => (
                    <option key={index + 2} value={`user-${index + 2}`}>
                      {userId}
                    </option>
                  ))}
                </Select>
                <Button
                  as={Link}
                  to="/"
                  onClick={e => {
                    value ? login() : e.preventDefault();
                  }}
                  isDisabled={!value}
                  mt={4}
                >
                  Log in
                </Button>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </Container>
    </>
  );
}
