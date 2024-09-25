import { gql, TypedDocumentNode } from "@apollo/client";
import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { IoBedOutline } from "react-icons/io5";
import LocationType from "../LocationType";
import { ListingDetails_listingFragment } from "./__generated__/Details.types";

interface ListingDetailsProps {
  listing: ListingDetails_listingFragment;
}

export function ListingDetails({ listing }: ListingDetailsProps) {
  return (
    <Stack spacing="4">
      <Heading as="h2" size="md">
        Details
      </Heading>
      <HStack spacing="16" align="top">
        <Stack spacing="2">
          <Text fontWeight="bold">Number of beds</Text>
          <Stack align="center" direction="row">
            <IoBedOutline size={22} />
            <Text ml="1">{listing.numOfBeds} beds</Text>
          </Stack>
        </Stack>
        <Stack spacing="2">
          <Text fontWeight="bold">Location Type </Text>
          <Stack align="center" direction="row">
            <LocationType locType={listing.locationType} size="22px" />
            <Text casing="capitalize" ml="1">
              {listing.locationType}
            </Text>
          </Stack>
        </Stack>
      </HStack>
    </Stack>
  );
}

ListingDetails.fragments = {
  listing: gql`
    fragment ListingDetails_listing on Listing {
      numOfBeds
      locationType
    }
  ` as TypedDocumentNode<ListingDetails_listingFragment>,
};
