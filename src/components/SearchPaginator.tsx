import { Button, Flex, Text } from "@chakra-ui/react";

interface SearchPaginatorProps {
  page: number;
  onChange: (page: number) => void;
  hasNextPage: boolean;
}

export function SearchPaginator({
  page,
  onChange,
  hasNextPage,
}: SearchPaginatorProps) {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Button onClick={() => onChange(page - 1)} isDisabled={page === 1}>
        Previous page
      </Button>
      <Text fontWeight="semibold">Page {page}</Text>
      <Button onClick={() => onChange(page + 1)} isDisabled={!hasNextPage}>
        Next page
      </Button>
    </Flex>
  );
}
