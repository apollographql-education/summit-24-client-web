import { Flex, Text } from "@chakra-ui/react";

interface ListingItemCostProps {
  costPerNight: number;
}

export function ListingItemCost({ costPerNight }: ListingItemCostProps) {
  return (
    <Flex fontSize="lg" ml={6}>
      <Text fontWeight="bold"> ¤ {costPerNight}</Text> / night
    </Flex>
  );
}
