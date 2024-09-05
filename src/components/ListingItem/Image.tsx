import { Image } from "@chakra-ui/react";

interface ListingItemImageProps {
  alt: string;
  src: string;
}

export function ListingItemImage({ alt, src }: ListingItemImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      width="320px"
      maxW="320px"
      borderRadius="8"
    />
  );
}
