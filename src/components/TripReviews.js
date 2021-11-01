import PropTypes from 'prop-types';
import React, {useState} from 'react';
import ReviewInput, {ReviewRating} from './TripReviewInput';
import {Box, Button, Flex, Text, VStack} from '@chakra-ui/react';
import {useMutation} from '@apollo/client';

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

export default function TripReviews({
  ratingKey,
  locationReview,
  hostReview,
  guestReview,
  mutation,
  mutationOptions,
  isPastTrip = false,
  isHost = false
}) {
  const [reviewsInput, setReviewsInput] = useState({});
  const hasReviews = isHost ? guestReview : locationReview && hostReview;
  const isSubmitDisabled = isHost
    ? !(reviewsInput.guestReview?.rating && reviewsInput.guestReview?.text)
    : !(
        reviewsInput?.locationReview?.rating &&
        reviewsInput?.locationReview?.text &&
        reviewsInput?.hostReview?.rating &&
        reviewsInput?.hostReview?.text
      );
  const subject = isHost ? "The guest's" : 'Your';

  const [submitReviews] = useMutation(mutation, {
    ...mutationOptions,
    variables: {...mutationOptions.variables, ...reviewsInput}
  });

  return (
    <VStack w="full" alignItems="flex-start" spacing="4" p="4">
      {/* guest's review about location */}
      {locationReview ? (
        <Review ratingKey={ratingKey} review={locationReview}>
          {subject} review about the location
        </Review>
      ) : isPastTrip ? (
        isHost ? (
          <Text>No guest review about location</Text>
        ) : (
          <ReviewInput
            reviewType="location"
            setReviewsInput={setReviewsInput}
          />
        )
      ) : null}

      {/* guest's review about host */}
      {hostReview ? (
        <Review ratingKey={ratingKey} review={hostReview}>
          {subject} review about {isHost ? 'you' : 'the host'}
        </Review>
      ) : isPastTrip ? (
        isHost ? (
          <Text>No guest review about you</Text>
        ) : (
          <ReviewInput
            reviewType="host"
            setReviewsInput={setReviewsInput}
            isHost
          />
        )
      ) : null}

      {/* host's review about guest */}
      {guestReview ? (
        <Review ratingKey={ratingKey} review={guestReview}>
          What {isHost ? 'you' : 'the host'} said about{' '}
          {isHost ? 'the guest' : 'you'}
        </Review>
      ) : isPastTrip ? (
        isHost ? (
          <ReviewInput
            reviewType="guest"
            setReviewsInput={setReviewsInput}
            isHost
          />
        ) : (
          <Text>No host review about you</Text>
        )
      ) : null}

      {!hasReviews && isPastTrip ? (
        <Button onClick={submitReviews} disabled={isSubmitDisabled}>
          Submit Review
        </Button>
      ) : null}
    </VStack>
  );
}

TripReviews.propTypes = {
  locationReview: PropTypes.object,
  hostReview: PropTypes.object,
  guestReview: PropTypes.object,
  ratingKey: PropTypes.string.isRequired,
  mutation: PropTypes.object,
  mutationOptions: PropTypes.object,
  isPastTrip: PropTypes.bool,
  isHost: PropTypes.bool
};
