import { Heading, Stack, StackProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface BookStayContainerProps extends StackProps {
  title: string;
  children: ReactNode;
}

export function BookStayContainer({
  children,
  title,
  ...props
}: BookStayContainerProps) {
  return (
    <Stack
      p="4"
      w="300px"
      maxHeight="fit-content"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="8px"
      css={{ height: "fit-content" }}
      {...props}
    >
      <Heading as="h2" size="md" fontWeight="bold" mb="4">
        {title}
      </Heading>
      {children}
    </Stack>
  );
}
