import { gql, TypedDocumentNode } from "@apollo/client";
import { Heading, Stack, Text } from "@chakra-ui/react";
import { ListingDescription_listingFragment } from "./__generated__/Description.types";

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

ListingDescription.fragments = {
  listing: gql`
    fragment ListingDescription_listing on Listing {
      description
    }
  ` as TypedDocumentNode<ListingDescription_listingFragment>,
};
