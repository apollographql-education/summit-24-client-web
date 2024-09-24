import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Stars from "../Stars";

interface ListingReviewsProps {
  reviews: Array<{
    rating: number;
    text: string;
    author: { id: string; name: string; profilePicture: string };
  }>;
}

export function ListingReviews({ reviews }: ListingReviewsProps) {
  return (
    <Box>
      <Heading as="h2" size="md" mb="6">
        What other space travelers have to say about this stay
      </Heading>
      <Stack direction="column" spacing="6">
        {reviews.length === 0 ? (
          <Text>Uh-oh, this place has no reviews yet!</Text>
        ) : (
          reviews.map((review) => (
            <Flex align="flex-start" key={review.author.id}>
              <Stack>
                <Avatar
                  name="profile"
                  size="md"
                  borderColor="white"
                  borderWidth="1px"
                  src={review.author.profilePicture}
                  bg="gray.50"
                />
              </Stack>
              <Stack direction="column" spacing="1" pl={4}>
                <HStack align="flex-start">
                  <Heading size="sm">{review.author.name}</Heading>
                  <Stars size={16} rating={review.rating} />
                </HStack>
                <Text>{review.text}</Text>
              </Stack>
            </Flex>
          ))
        )}
      </Stack>
    </Box>
  );
}
