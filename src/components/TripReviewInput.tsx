import ReactStars from "react-rating-stars-component";
import { Flex, Text, Textarea } from "@chakra-ui/react";
import { IoStar, IoStarOutline } from "react-icons/io5";

interface ReviewRatingProps {
  rating?: number | null;
  onChange?: (rating: number) => void;
}

// https://www.npmjs.com/package/react-rating-stars-component
export function ReviewRating({
  rating = null,
  onChange = () => {},
}: ReviewRatingProps) {
  return (
    <ReactStars
      count={5}
      edit={rating !== null ? false : true}
      value={rating !== null ? rating : 0}
      onChange={onChange}
      size={16}
      isHalf={false}
      color="black"
      activeColor="black"
      emptyIcon={<IoStarOutline />}
      filledIcon={<IoStar />}
    />
  );
}

interface ReviewType {
  rating: number | null;
  text: string;
}

interface ReviewInputProps {
  review: ReviewType;
  label: string;
  onChange: (review: ReviewType) => void;
}

export default function ReviewInput({
  review,
  label,
  onChange,
}: ReviewInputProps) {
  return (
    <>
      <Flex alignItems="center">
        <Text fontWeight="semibold" mr={2}>
          {label}
        </Text>
        <ReviewRating
          rating={review?.rating}
          onChange={(rating) => onChange({ ...review, rating })}
        />
      </Flex>
      <Textarea
        placeholder="Leave your review"
        value={review?.text ?? ""}
        onChange={(e) => {
          onChange({ ...review, text: e.target.value });
        }}
        w="400px"
      />
    </>
  );
}
