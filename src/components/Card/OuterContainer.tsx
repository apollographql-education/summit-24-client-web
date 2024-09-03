import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface OuterContainerProps extends BoxProps {
  children?: ReactNode;
}

export function OuterContainer({ children, ...props }: OuterContainerProps) {
  return (
    <Box w="full" {...props}>
      {children}
    </Box>
  );
}
