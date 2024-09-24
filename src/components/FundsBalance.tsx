import { Box, Heading, Text } from "@chakra-ui/react";

interface FundsBalanceProps {
  funds: number;
}

export function FundsBalance({ funds }: FundsBalanceProps) {
  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.100"
      borderRadius={4}
      textAlign="center"
    >
      <Heading size="2xl">¤{funds}</Heading>
      <Text>credit balance</Text>
    </Box>
  );
}
