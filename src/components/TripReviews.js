import PropTypes from 'prop-types';
import React, {useState} from 'react';
import ReviewInput, {ReviewRating} from './TripReviewInput';
import {Box, Button, Flex, Text, VStack} from '@chakra-ui/react';
import {PAST_GUEST_TRIPS} from '../pages/past-trips';
import {gql, useMutation} from '@apollo/client';

function Review({review, children}) {
  return (
    <>
      {review ? (
        <Box>
          <Flex alignItems="center">
            <Text fontStyle="italic" mr="4">
              {children}
            </Text>
            <ReviewRating rating={review.rating} />
          </Flex>
          <Text>{review.text}</Text>
        </Box>
      ) : null}
    </>
  );
}

Review.propTypes = {
  review: PropTypes.object,
  children: PropTypes.node
};

export const SUBMIT_REVIEW = gql`
  mutation SubmitReview(
    $bookingId: ID!
    $hostReview: ReviewInput!
    $locationReview: ReviewInput!
  ) {
    submitHostAndLocationReviews(
      bookingId: $bookingId
      hostReview: $hostReview
      locationReview: $locationReview
    ) {
      success
      message
      hostReview {
        id
        text
        rating
      }
      locationReview {
        id
        text
        rating
      }
    }
  }
`;
export default function TripReviews({
  bookingId,
  ratingKey,
  locationReview,
  hostReview,
  guestReview,
  isPastTrip = false
}) {
  const [reviewsInput, setReviewsInput] = useState({});
  const hasReviews = locationReview && hostReview;

  // NOTE: for the scope of this project, we've opted for the simpler refetch approach
  // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
  const [submitReviews] = useMutation(SUBMIT_REVIEW, {
    variables: {
      bookingId,
      ...reviewsInput
    },
    refetchQueries: [{query: PAST_GUEST_TRIPS}]
  });

  return (
    <VStack w="full" alignItems="flex-start" spacing="4" p="4">
      {locationReview ? (
        <Review ratingKey={ratingKey} review={locationReview}>
          Your review about the location
        </Review>
      ) : (
        isPastTrip && (
          <ReviewInput
            reviewType="location"
            setReviewsInput={setReviewsInput}
          />
        )
      )}

      {hostReview ? (
        <Review ratingKey={ratingKey} review={hostReview}>
          Your review about the host
        </Review>
      ) : (
        isPastTrip && (
          <ReviewInput reviewType="host" setReviewsInput={setReviewsInput} />
        )
      )}

      <Review ratingKey={ratingKey} review={guestReview}>
        What the host said about you
      </Review>

      {!hasReviews && isPastTrip ? (
        <Button
          onClick={submitReviews}
          disabled={
            !(
              reviewsInput?.locationReview?.rating &&
              reviewsInput?.locationReview?.text &&
              reviewsInput?.hostReview?.rating &&
              reviewsInput?.hostReview?.text
            )
          }
        >
          Submit Review
        </Button>
      ) : null}
    </VStack>
  );
}

TripReviews.propTypes = {
  bookingId: PropTypes.string,
  locationReview: PropTypes.object,
  hostReview: PropTypes.object,
  guestReview: PropTypes.object,
  ratingKey: PropTypes.string.isRequired,
  isPastTrip: PropTypes.bool
};
