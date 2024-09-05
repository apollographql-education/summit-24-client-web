import { Box, Wrap } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <Box w="full" p={2}>
      <Wrap boxSizing="border-box" w="full" spacing="8" alignItems="flex-start">
        {children}
      </Wrap>
    </Box>
  );
}
