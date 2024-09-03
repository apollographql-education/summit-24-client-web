import { Wrap, WrapProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface InnerContainerProps extends WrapProps {
  children?: ReactNode;
}

export function InnerContainer({ children, ...props }: InnerContainerProps) {
  return (
    <Wrap
      boxSizing="border-box"
      w="full"
      spacing="8"
      alignItems="flex-start"
      {...props}
    >
      {children}
    </Wrap>
  );
}
