import { Image } from "@chakra-ui/react";

interface HostListingItemImageProps {
  alt: string;
  src: string;
}

export function HostListingItemImage({ alt, src }: HostListingItemImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      w="250px"
      h="140px"
      borderRadius={4}
    />
  );
}
