import { Text } from "@chakra-ui/react";
import Stars from "../Stars";

interface HostListingItemRatingProps {
  overallRating: number | null;
}

export function HostListingItemRating({
  overallRating,
}: HostListingItemRatingProps) {
  return overallRating ? (
    <Stars size={20} rating={overallRating} />
  ) : (
    <Text>No reviews yet</Text>
  );
}
