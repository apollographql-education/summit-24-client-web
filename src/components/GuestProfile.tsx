import {
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PageContainer } from "./PageContainer";
import { IoExit, IoWallet } from "react-icons/io5";
import { LogoutButton } from "./LogoutButton";

interface GuestProfileProps {
  user: {
    __typename: "Guest";
    name: string;
    profilePicture: string;
  };
}

export function GuestProfile({ user }: GuestProfileProps) {
  return (
    <PageContainer>
      <Center>
        <VStack direction="column" spacing="3" textAlign="center">
          <Heading as="h2">My profile</Heading>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={user.profilePicture}
            alt="profile picture"
          />
          <Text fontWeight="bold" fontSize="lg">
            {user.name}{" "}
            <Text
              as="span"
              textTransform="uppercase"
              fontWeight="normal"
              fontSize="sm"
            >
              (Guest)
            </Text>
          </Text>
          <Stack direction="row" spacing="2">
            <Button as={Link} to="/wallet" rightIcon={<IoWallet />}>
              Go to wallet
            </Button>
            <LogoutButton />
          </Stack>
        </VStack>
      </Center>
    </PageContainer>
  );
}
