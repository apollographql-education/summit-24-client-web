import PropTypes from 'prop-types';
import React from 'react';
import {HStack} from '@chakra-ui/react';
import {IoStar, IoStarHalf, IoStarOutline} from 'react-icons/io5';

export default function ListingCard({rating, size = 16}) {
  const getStars = rating => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<IoStar key={i} size={size} />);
    }
    if (rating % 1 !== 0) {
      stars.push(<IoStarHalf key="half-star" size={size} />);
    }
    for (let i = 0; i < 5 - Math.ceil(rating); i++) {
      stars.push(<IoStarOutline key={`empty-${i}`} size={size} />);
    }
    return stars;
  };

  return <HStack spacing="1">{getStars(rating)}</HStack>;
}

ListingCard.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.number
};
