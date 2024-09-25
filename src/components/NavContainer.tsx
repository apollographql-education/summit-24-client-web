import { Box, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavContainerProps {
  children?: ReactNode;
}

export function NavContainer({ children }: NavContainerProps) {
  return (
    <Box px="2" h="80px" bgColor="white">
      <Flex direction="row" justify="space-between" align="center" p={4}>
        {children}
      </Flex>
    </Box>
  );
}
