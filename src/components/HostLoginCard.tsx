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

interface HostLoginCardProps {
  onClickLogin: () => void;
}

export function HostLoginCard({ onClickLogin }: HostLoginCardProps) {
  return (
    <Box border="1px solid" borderRadius="8" borderColor="gray.100" p="6">
      <Center h="300px">
        <Flex alignItems="center" w="330px" direction="column">
          <Heading as="h2" size="lg">
            Host
          </Heading>
          <Stack mt="4">
            <HStack alignItems="center">
              <IoCheckmark /> <Text>Create and manage listings</Text>
            </HStack>
            <HStack alignItems="center">
              <IoCheckmark /> <Text>Edit your profile</Text>
            </HStack>
            <HStack alignItems="center">
              <IoCheckmark /> <Text>Write reviews about your guests</Text>
            </HStack>
          </Stack>
          <Button
            as={Link}
            to="/"
            flex="1"
            mt="8"
            onClick={onClickLogin}
            w="100%"
          >
            Log in as host
          </Button>
        </Flex>
      </Center>
    </Box>
  );
}
