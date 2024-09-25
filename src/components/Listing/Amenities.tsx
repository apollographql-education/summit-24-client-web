import { gql, TypedDocumentNode } from "@apollo/client";
import { Box, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import startCase from "lodash/startCase";
import { ListingAmenities_amenitiesFragment } from "./__generated__/Amenities.types";

interface ListingAmentitiesProps {
  amenities: ListingAmenities_amenitiesFragment[];
}

export function ListingAmenities({ amenities }: ListingAmentitiesProps) {
  const amenitiesByCategory = groupByCategory(amenities);

  return (
    <Box>
      <Heading as="h2" size="md" mb="2">
        Amenities
      </Heading>
      <Stack spacing="3">
        {Object.entries(amenitiesByCategory).map(([category, amenities]) => (
          <Stack key={category} spacing="3">
            <Text fontWeight="semibold">
              {startCase(category.toLowerCase())}
            </Text>
            <Wrap spacing="2">
              {amenities.map((amenity) => (
                <Text
                  key={amenity}
                  border="1px"
                  borderColor="gray.200"
                  py="2"
                  px="3"
                  borderRadius="4"
                >
                  {amenity}
                </Text>
              ))}
            </Wrap>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

ListingAmenities.fragments = {
  amenities: gql`
    fragment ListingAmenities_amenities on Amenity {
      category
      name
    }
  ` as TypedDocumentNode<ListingAmenities_amenitiesFragment>,
};

function groupByCategory(amenities: ListingAmenities_amenitiesFragment[]) {
  return amenities
    .filter(Boolean)
    .reduce<Record<string, string[]>>((acc, amenity) => {
      if (acc[amenity.category]) {
        acc[amenity.category] = [...acc[amenity.category], amenity.name];
      } else {
        acc[amenity.category] = [amenity.name];
      }
      return acc;
    }, {});
}
