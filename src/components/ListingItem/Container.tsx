import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ListingItemContainerProps {
  children: ReactNode;
  to: string;
}

export function ListingItemContainer({
  children,
  to,
}: ListingItemContainerProps) {
  return (
    <Box
      overflow="hidden"
      width="100%"
      transition="0.3s all ease-in-out"
      opacity="95%"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
        opacity: "100%",
      }}
      as={Link}
      to={to}
      mb="2"
    >
      <Flex direction="row" justify="space-between" minH="120px" maxH="200px">
        {children}
      </Flex>
    </Box>
  );
}
