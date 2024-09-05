import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import { SortByCriteria } from "../__generated__/types";

interface SearchResultsHeaderProps {
  sortBy: SortByCriteria;
  onChange: (values: FormValues) => void;
}

type FormValues = {
  sortBy: SortByCriteria;
};

export function SearchResultsHeader({
  sortBy,
  onChange,
}: SearchResultsHeaderProps) {
  return (
    <Flex alignItems="center" mb="4" flexWrap="wrap" gap={4}>
      <Heading as="h2" fontSize="3xl" flex={1}>
        Stays across space
      </Heading>
      <Flex alignItems="center" flexWrap="wrap">
        <Text fontWeight="bold" fontSize="lg" mr={4}>
          Sort by
        </Text>
        <Select
          width="200px"
          size="lg"
          onChange={(e) =>
            onChange({ sortBy: e.target.value as SortByCriteria })
          }
          value={sortBy}
        >
          <option disabled>Sort by</option>
          <option value="COST_ASC">Price (low to high)</option>
          <option value="COST_DESC">Price (high to low)</option>
        </Select>
      </Flex>
    </Flex>
  );
}
