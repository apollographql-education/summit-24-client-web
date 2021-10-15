import PropTypes from 'prop-types';
import React, {useState} from 'react';
import ReviewInput, {ReviewRating} from './TripReviewInput';
import {Box, Button, Flex, Text, VStack} from '@chakra-ui/react';
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
  console.log('bookingId: ', bookingId);

  const [reviewsInput, setReviewsInput] = useState({});
  const hasReviews = locationReview && hostReview;
  const [submitReviews] = useMutation(SUBMIT_REVIEW, {
    variables: {
      bookingId,
      ...reviewsInput
    },
    onCompleted: data => {
      console.log(data);
    }
  });

  return (
    <VStack w="full" alignItems="flex-start" spacing="4">
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

      {/* TODO: send mutation request on click */}
      {!hasReviews && isPastTrip ? (
        <Button onClick={submitReviews}>Submit Review</Button>
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
