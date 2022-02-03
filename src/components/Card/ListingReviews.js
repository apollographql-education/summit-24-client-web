import PropTypes from 'prop-types';
import React from 'react';
import TripReviews from '../TripReviews';
import {Collapse} from '@chakra-ui/react';

export function ListingReviews({isOpen, title, isPast, trip, mutationConfig}) {
  const {locationReview, hostReview, guestReview} = trip;
  const {mutation, mutationOptions} = mutationConfig;

  return (
    <Collapse in={isOpen} py="4">
      <TripReviews
        ratingKey={title}
        location={title}
        locationReview={locationReview}
        hostReview={hostReview}
        guestReview={guestReview}
        isPastTrip={isPast}
        isHost={trip.listing.host.id === localStorage.id}
        mutation={mutation}
        mutationOptions={mutationOptions}
      />
    </Collapse>
  );
}

ListingReviews.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isPast: PropTypes.bool,
  title: PropTypes.string.isRequired,
  trip: PropTypes.object,
  mutationConfig: PropTypes.object.isRequired
};
