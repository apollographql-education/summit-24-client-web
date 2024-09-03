import { ReactNode, useState } from "react";
import ReviewInput, { ReviewRating } from "./TripReviewInput";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { gql } from "@apollo/client";
import { fragments } from "../fragments";
import {
  GuestReview_guestReviewFragment,
  GuestReview_hostReviewFragment,
  GuestReview_locationReviewFragment,
  HostAndLocationReviewFragment_guestReviewFragment,
  HostAndLocationReviewFragment_hostReviewFragment,
  HostAndLocationReviewFragment_locationReviewFragment,
  Review_reviewFragment,
} from "./__generated__/TripReviews.types";

interface ReviewType {
  rating: number;
  text: string;
}

interface ReviewProps {
  review: Review_reviewFragment;
  children?: ReactNode;
}

fragments.register(gql`
  fragment Review_review on Review {
    rating
    text
  }
`);

function Review({ review, children }: ReviewProps) {
  return review ? (
    <Box>
      <Flex alignItems="center">
        <Text fontWeight="semibold" mr="4">
          {children}
        </Text>
        <ReviewRating rating={review.rating} />
      </Flex>
      <Text>{review.text}</Text>
    </Box>
  ) : null;
}

interface TripReviewsProps {
  locationReview: HostAndLocationReviewFragment_locationReviewFragment | null;
  hostReview: HostAndLocationReviewFragment_hostReviewFragment | null;
  guestReview: HostAndLocationReviewFragment_guestReviewFragment | null;
  onSubmitReview: (reviews: {
    locationReview: ReviewType;
    hostReview: ReviewType;
  }) => void;
}

fragments.register(gql`
  fragment HostAndLocationReviewFragment_locationReview on Review {
    ...Review_review
  }

  fragment HostAndLocationReviewFragment_hostReview on Review {
    ...Review_review
  }

  fragment HostAndLocationReviewFragment_guestReview on Review {
    ...Review_review
  }
`);

export function HostAndLocationReview({
  locationReview: submittedLocationReview,
  hostReview: submittedHostReview,
  guestReview,
  onSubmitReview,
}: TripReviewsProps) {
  const [hostReview, setHostReview] = useState<ReviewFormType>({
    rating: null,
    text: "",
  });
  const [locationReview, setLocationReview] = useState<ReviewFormType>({
    rating: null,
    text: "",
  });
  const [isReviewInputOpen, setIsReviewInputOpen] = useState(false);

  return (
    <VStack w="full" alignItems="flex-start" spacing="3" flex="1">
      <Heading as="h2" fontWeight="semibold" fontSize="lg">
        What your host had to say
      </Heading>
      {!guestReview && <NoReviews author={"host"} />}
      {guestReview && <Review review={guestReview}>Guest</Review>}
      {submittedLocationReview && submittedHostReview && (
        <>
          <Heading as="h2" fontWeight="semibold" fontSize="lg">
            Your rating and review
          </Heading>
          <Review review={submittedLocationReview}>Location</Review>
          <Review review={submittedHostReview}>Host</Review>
        </>
      )}
      {!submittedLocationReview && !submittedHostReview && (
        <>
          <Button
            variant="link"
            rightIcon={isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />}
            onClick={() => setIsReviewInputOpen((prevState) => !prevState)}
          >
            Review your stay
          </Button>
          <Collapse in={isReviewInputOpen} py="4" w="100%">
            <Stack spacing={4}>
              <Heading as="h2" fontWeight="semibold" fontSize="lg">
                Your rating and review
              </Heading>
              <ReviewInput
                label="Location"
                review={locationReview}
                onChange={setLocationReview}
              />
              <ReviewInput
                label="Host"
                review={hostReview}
                onChange={setHostReview}
              />
              <Button
                onClick={() => {
                  if (
                    isFullReview(hostReview) &&
                    isFullReview(locationReview)
                  ) {
                    onSubmitReview({ hostReview, locationReview });
                  }
                }}
                isDisabled={
                  !isFullReview(locationReview) || !isFullReview(hostReview)
                }
                w="fit-content"
              >
                Submit Review
              </Button>
            </Stack>
          </Collapse>
        </>
      )}
    </VStack>
  );
}

interface GuestReviewProps {
  locationReview: GuestReview_locationReviewFragment | null;
  hostReview: GuestReview_hostReviewFragment | null;
  guestReview: GuestReview_guestReviewFragment | null;
  onSubmitReview: (review: ReviewType) => void;
}

interface ReviewFormType {
  text: string;
  rating: number | null;
}

fragments.register(gql`
  fragment GuestReview_locationReview on Review {
    ...Review_review
  }

  fragment GuestReview_hostReview on Review {
    ...Review_review
  }

  fragment GuestReview_guestReview on Review {
    ...Review_review
  }
`);

export function GuestReview({
  locationReview,
  hostReview,
  guestReview,
  onSubmitReview,
}: GuestReviewProps) {
  const [isReviewInputOpen, setIsReviewInputOpen] = useState(false);
  const [review, setReview] = useState<ReviewFormType>({
    rating: null,
    text: "",
  });

  return (
    <VStack w="full" alignItems="flex-start" spacing="3" flex="1">
      <Heading as="h2" fontWeight="semibold" fontSize="lg">
        What your guest had to say
      </Heading>
      {!locationReview && !hostReview && <NoReviews author="guest" />}
      {locationReview && <Review review={locationReview}>Location</Review>}
      {hostReview && <Review review={hostReview}>Host</Review>}
      {guestReview ? (
        <>
          <Heading as="h2" fontWeight="semibold" fontSize="lg">
            Your rating and review
          </Heading>
          <Review review={guestReview}>Guest</Review>
        </>
      ) : (
        <>
          <Button
            mt={4}
            variant="link"
            rightIcon={isReviewInputOpen ? <IoChevronUp /> : <IoChevronDown />}
            onClick={() => setIsReviewInputOpen((prevState) => !prevState)}
          >
            Review your guest
          </Button>
          <Collapse in={isReviewInputOpen} py="4" w="100%">
            <Stack spacing={4}>
              <Heading as="h2" fontWeight="semibold" fontSize="lg">
                Your rating and review
              </Heading>
              <ReviewInput label="Guest" review={review} onChange={setReview} />
              <Button
                onClick={() => {
                  if (isFullReview(review)) {
                    onSubmitReview(review);
                  }
                }}
                isDisabled={!isFullReview(review)}
                w="fit-content"
              >
                Submit Review
              </Button>
            </Stack>
          </Collapse>
        </>
      )}
    </VStack>
  );
}

interface NoReviewsProps {
  author: string;
}

function NoReviews({ author }: NoReviewsProps) {
  return (
    <Text>
      Your {author} hasn&apos;t reviewed their stay yet. We&apos;ve reached out
      to them and will report back here once we&apos;ve received their thoughts.
    </Text>
  );
}

function isFullReview(review: ReviewFormType): review is ReviewType {
  return Boolean(review.rating && review.text);
}
