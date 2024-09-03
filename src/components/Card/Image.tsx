import { Avatar, Image as ChakraImage } from "@chakra-ui/react";

interface ImageProps {
  src: string;
  alt: string;
  isAvatar?: boolean;
  w?: string;
  h?: string;
}

export function Image({ src, alt, isAvatar = false, w, h }: ImageProps) {
  const IMG_PROPS = {
    src,
    alt,
    h: h ? h : "full",
    bg: "gray.50",
  };

  if (isAvatar) {
    return <Avatar {...IMG_PROPS} w={w ? w : "auto"} />;
  }

  return <ChakraImage {...IMG_PROPS} w={w ? w : "200px"} borderRadius={4} />;
}
