import { Heading, Stack, Text } from "@chakra-ui/react";

interface ListingDescriptionProps {
  listing: {
    description: string;
  };
}

export function ListingDescription({ listing }: ListingDescriptionProps) {
  return (
    <Stack>
      <Heading as="h2" size="md">
        About this location
      </Heading>
      <Text fontSize="lg" fontWeight="regular" mr="1">
        {listing.description}
      </Text>
    </Stack>
  );
}
