import { Text } from "@chakra-ui/react";

interface ListingItemDescriptionProps {
  description: string;
}

export function ListingItemDescription({
  description,
}: ListingItemDescriptionProps) {
  return (
    <Text fontSize="lg" maxWidth="650px" noOfLines={2}>
      {description}
    </Text>
  );
}
