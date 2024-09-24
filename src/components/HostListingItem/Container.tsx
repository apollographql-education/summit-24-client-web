import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HostListingItemContainerProps {
  children: ReactNode;
}

export function HostListingItemContainer({
  children,
}: HostListingItemContainerProps) {
  return (
    <Box overflow="hidden" w="full">
      {children}
    </Box>
  );
}
