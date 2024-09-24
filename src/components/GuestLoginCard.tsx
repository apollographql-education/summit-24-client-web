import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IoCheckmark } from "react-icons/io5";
import { Link } from "react-router-dom";

interface GuestLoginCardProps {
  onClickLogin: () => void;
}

export function GuestLoginCard({ onClickLogin }: GuestLoginCardProps) {
  return (
    <Box border="1px solid" borderRadius="8" borderColor="gray.100" p="6">
      <Center h="300px">
        <Flex alignItems="center" w="330px" direction="column">
          <Heading as="h2" size="lg">
            Guest
          </Heading>
          <Stack mt="4">
            <HStack alignItems="center">
              <IoCheckmark />
              <Text>Book places to stay</Text>
            </HStack>
            <HStack alignItems="center">
              <IoCheckmark />
              <Text>Add funds to your wallet</Text>
            </HStack>
            <HStack alignItems="center">
              <IoCheckmark />
              <Text>Write reviews about your stay</Text>
            </HStack>
          </Stack>
          <Button
            as={Link}
            to="/"
            flex="1"
            onClick={onClickLogin}
            mt="8"
            w="100%"
          >
            Log in as guest
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
