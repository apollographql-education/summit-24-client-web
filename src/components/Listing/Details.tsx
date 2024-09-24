import { Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { IoBedOutline } from "react-icons/io5";
import * as GraphQLTypes from "../../__generated__/types";
import LocationType from "../LocationType";

interface ListingDetailsProps {
  listing: {
    numOfBeds: number;
    locationType: GraphQLTypes.LocationType;
  };
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
