import { Text } from "@chakra-ui/react";
import Stars from "../Stars";

interface ListingItemRatingProps {
  rating: number | null;
}

export function ListingItemRating({ rating }: ListingItemRatingProps) {
  return rating ? (
    <Stars size={20} rating={rating} />
  ) : (
    <Text>No reviews yet</Text>
  );
}
