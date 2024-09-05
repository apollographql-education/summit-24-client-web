import { Flex, Text } from "@chakra-ui/react";
import { IoBed } from "react-icons/io5";

interface ListingItemNumOfBedsProps {
  numOfBeds: number;
}

export function ListingItemNumOfBeds({ numOfBeds }: ListingItemNumOfBedsProps) {
  return (
    <Flex ml={6} align="center">
      <IoBed size={22} />
      <Text fontSize="lg" ml={1}>
        {numOfBeds}
      </Text>
    </Flex>
  );
}
