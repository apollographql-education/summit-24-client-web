import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import { SortByCriteria } from "../__generated__/types";

interface SearchResultsHeaderProps {
  limit: number;
  sortBy: SortByCriteria;
  onChange: (values: FormValues) => void;
}

type FormValues = {
  limit: number;
  sortBy: SortByCriteria;
};

export function SearchResultsHeader({
  limit,
  sortBy,
  onChange,
}: SearchResultsHeaderProps) {
  function handleChange(values: Partial<FormValues>) {
    onChange({ limit, sortBy, ...values });
  }

  return (
    <Flex alignItems="center" mb="4" flexWrap="wrap" gap={4}>
      <Heading as="h2" fontSize="3xl" flex={1}>
        Stays across space
      </Heading>
      <Flex alignItems="center" flexWrap="wrap">
        <Text fontWeight="bold" fontSize="lg" mr={4}>
          Results per page
        </Text>
        <Select
          width="75px"
          size="lg"
          onChange={(e) => handleChange({ limit: Number(e.target.value) })}
          value={limit}
        >
          <option disabled>Per page</option>
          <option value={2}>2</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </Select>
      </Flex>
      <Flex alignItems="center" flexWrap="wrap">
        <Text fontWeight="bold" fontSize="lg" mr={4}>
          Sort by
        </Text>
        <Select
          width="200px"
          size="lg"
          onChange={(e) =>
            handleChange({ sortBy: e.target.value as SortByCriteria })
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
