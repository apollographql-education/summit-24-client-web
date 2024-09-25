import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import airlockLogo from "../assets/airlock-logo.svg";

export function Logo() {
  return (
    <Box as={Link} to="/">
      <HStack spacing="2">
        <Image
          boxSize="50px"
          objectFit="cover"
          src={airlockLogo}
          alt="airlock logo"
        />
        <Text
          fontWeight="600"
          fontSize="2xl"
          textTransform="uppercase"
          fontFamily="Source Sans Pro"
          letterSpacing="1.4px"
        >
          Airlock
        </Text>
      </HStack>
    </Box>
  );
}
