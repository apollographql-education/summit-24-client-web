import { Flex, FlexProps, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContentProps {
  title: string;
  checkInDate: string;
  checkOutDate: string;
  hasReviews?: boolean;
  children?: ReactNode;
  wrapperProps?: FlexProps;
}

export function Content({
  title,
  checkInDate,
  checkOutDate,
  children,
  wrapperProps,
}: ContentProps) {
  return (
    <>
      <Flex direction="column" alignItems="flex-start" {...wrapperProps}>
        <Heading as="h2" size="md" fontWeight="semibold">
          {title}
        </Heading>
        <Text mt="2">
          {checkInDate} - {checkOutDate}
        </Text>
      </Flex>
      {children}
    </>
  );
}
