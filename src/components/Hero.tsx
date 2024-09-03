import { ReactNode } from "react";
import Background from "../assets/homepage-bg.png";
import { Box } from "@chakra-ui/react";

interface HeroProps {
  children?: ReactNode;
}

export default function Hero({ children }: HeroProps) {
  return (
    <Box bgColor="brand.midnight">
      <Box
        bgImage={Background}
        bgRepeat="no-repeat"
        minH="500px"
        maxW="2000px"
        mx="auto"
        backgroundSize="cover"
      >
        {children}
      </Box>
    </Box>
  );
}
