import { Image } from "@chakra-ui/react";

interface ListingImageProps {
  src: string;
}

export function ListingImage({ src }: ListingImageProps) {
  return <Image src={src} objectFit="cover" width="100%" borderRadius={8} />;
}
