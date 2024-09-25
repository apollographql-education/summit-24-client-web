import { gql, TypedDocumentNode } from "@apollo/client";
import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Stars from "../Stars";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";
import { ListingHeader_listingFragment } from "./__generated__/Header.types";

interface ListingHeaderProps {
  canEditListing: boolean;
  listing: ListingHeader_listingFragment;
}

export function ListingHeader({ canEditListing, listing }: ListingHeaderProps) {
  return (
    <Flex justifyContent="space-between">
      <Stack>
        <Heading as="h1" size="lg">
          {listing.title}
        </Heading>
        {listing.overallRating ? (
          <Stars size={20} rating={listing.overallRating} />
        ) : (
          <Text>Uh-oh, this place has no reviews yet!</Text>
        )}
      </Stack>
      {canEditListing && (
        <Button
          as={Link}
          to={`/listing/${listing.id}/edit`}
          rightIcon={<IoCreate size={20} />}
          ml="4"
        >
          Edit your listing
        </Button>
      )}
    </Flex>
  );
}

ListingHeader.fragments = {
  listing: gql`
    fragment ListingHeader_listing on Listing {
      id
      title
      overallRating
    }
  ` as TypedDocumentNode<ListingHeader_listingFragment>,
};
