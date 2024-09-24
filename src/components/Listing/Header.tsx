import { Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Stars from "../Stars";
import { Link } from "react-router-dom";
import { IoCreate } from "react-icons/io5";

interface ListingHeaderProps {
  canEditListing: boolean;
  listing: {
    id: string;
    title: string;
    overallRating: number | null;
  };
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
