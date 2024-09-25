import { gql, TypedDocumentNode } from "@apollo/client";
import { Avatar, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Stars from "../Stars";
import { ListingHostDetails_hostFragment } from "./__generated__/HostDetails.types";

interface ListingHostDetailsProps {
  host: ListingHostDetails_hostFragment;
}

export function ListingHostDetails({ host }: ListingHostDetailsProps) {
  return (
    <Box>
      <Heading as="h2" size="md" mb="2">
        Meet your host
      </Heading>
      <Flex align="flex-start" justify="space-between">
        <Stack>
          <Flex>
            <Text fontWeight="semibold" mr={4}>
              {host.name}
            </Text>
            <Stars size={16} rating={host.overallRating ?? 0} />
          </Flex>
          <Text>{host.profileDescription}</Text>
        </Stack>
        <Avatar
          name="profile"
          size="md"
          borderColor="white"
          borderWidth="1px"
          src={host.profilePicture}
          ml={4}
          bg="gray.50"
        />
      </Flex>
    </Box>
  );
}

ListingHostDetails.fragments = {
  host: gql`
    fragment ListingHostDetails_host on Host {
      name
      overallRating
      profileDescription
      profilePicture
    }
  ` as TypedDocumentNode<ListingHostDetails_hostFragment>,
};
