import PropTypes from 'prop-types';
import React from 'react';
import {Box, Button, Flex, Text, Textarea, VStack} from '@chakra-ui/react';
import {IoStar, IoStarHalfOutline, IoStarOutline} from 'react-icons/io5';

function Rating({id, ratingKey, rating}) {
  return (
    <Flex ml="4">
      {Array.from({length: 5}, (_, i) => {
        const isFraction = rating > i && rating < i + 1;
        const key = `${i}-${ratingKey}-${id}`;

        if (isFraction) {
          return <IoStarHalfOutline key={key} />;
        }

        return (
          <>{i < rating ? <IoStar key={key} /> : <IoStarOutline key={key} />}</>
        );
      })}
    </Flex>
  );
}

Rating.propTypes = {
  rating: PropTypes.number,
  id: PropTypes.string.isRequired,
  ratingKey: PropTypes.string.isRequired
};

// TODO: save value in state
function ReviewInput({reviewType}) {
  return (
    <>
      <Text>Review the {reviewType}</Text>
      <Textarea placeholder="Leave your review" />
    </>
  );
}

ReviewInput.propTypes = {
  reviewType: PropTypes.string.isRequired
};

function Review({ratingKey, review, children}) {
  return (
    <>
      {review ? (
        <Box>
          <Flex alignItems="center">
            <Text fontStyle="italic">{children}</Text>
            <Rating
              rating={review.rating}
              id={review.id}
              ratingKey={ratingKey}
            />
          </Flex>
          <Text>{review.text}</Text>
        </Box>
      ) : null}
    </>
  );
}

Review.propTypes = {
  review: PropTypes.object,
  children: PropTypes.node,
  ratingKey: PropTypes.string.isRequired
};

export default function TripReviews({
  ratingKey,
  locationReview,
  hostReview,
  guestReview,
  isPastTrip = false
}) {
  const hasReviews = locationReview && hostReview;
  console.log({hasReviews, locationReview, hostReview});

  return (
    <VStack w="full" alignItems="flex-start" spacing="4">
      {locationReview ? (
        <Review ratingKey={ratingKey} review={locationReview}>
          Your review about the location
        </Review>
      ) : (
        isPastTrip && <ReviewInput reviewType="location" />
      )}

      {hostReview ? (
        <Review ratingKey={ratingKey} review={hostReview}>
          Your review about the host
        </Review>
      ) : (
        isPastTrip && <ReviewInput reviewType="host" />
      )}

      <Review ratingKey={ratingKey} review={guestReview}>
        What the host said about you
      </Review>

      {/* TODO: send mutation request on click */}
      {!hasReviews && isPastTrip ? <Button>Submit Review</Button> : null}
    </VStack>
  );
}

TripReviews.propTypes = {
  locationReview: PropTypes.object,
  hostReview: PropTypes.object,
  guestReview: PropTypes.object,
  ratingKey: PropTypes.string.isRequired,
  isPastTrip: PropTypes.bool
};
