import { Text } from "@chakra-ui/react";
import { LocationType } from "../../__generated__/types";

interface ListingItemLocationTypeProps {
  locationType: LocationType;
}

export function ListingItemLocationType({
  locationType,
}: ListingItemLocationTypeProps) {
  return (
    <Text
      fontSize="sm"
      fontWeight={600}
      casing="uppercase"
      color="grey.dark"
      fontFamily="Source Code Pro"
    >
      {locationType}
    </Text>
  );
}
