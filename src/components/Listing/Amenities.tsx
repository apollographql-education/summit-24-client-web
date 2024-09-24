import { Box, Heading, Stack, Text, Wrap } from "@chakra-ui/react";
import startCase from "lodash/startCase";

interface ListingAmentitiesProps {
  listing: {
    amenities: Array<{ category: string; name: string } | null>;
  };
}

export function ListingAmentities({ listing }: ListingAmentitiesProps) {
  const amenitiesByCategory = listing.amenities
    .filter(Boolean)
    .reduce<Record<string, string[]>>((acc, amenity) => {
      if (acc[amenity.category]) {
        acc[amenity.category] = [...acc[amenity.category], amenity.name];
      } else {
        acc[amenity.category] = [amenity.name];
      }
      return acc;
    }, {});

  return (
    <Box>
      <Heading as="h2" size="md" mb="2">
        Amenities
      </Heading>
      <Stack spacing="3">
        {Object.entries(amenitiesByCategory).map(([category, amenities]) => {
          const title = startCase(category.toLowerCase());

          return (
            <Stack spacing="3">
              <Text fontWeight="semibold">{title}</Text>
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
          );
        })}
      </Stack>
    </Box>
  );
}
