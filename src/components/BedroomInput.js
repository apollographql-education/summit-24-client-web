import PropTypes from 'prop-types';
import React from 'react';
import {Select} from '@chakra-ui/react';

export default function BedroomInput({numOfBeds, setNumOfBeds, ...props}) {
  return (
    <Select
      onChange={e => setNumOfBeds(Number(e.target.value))}
      value={numOfBeds}
      {...props}
    >
      <option disabled="disabled">Number of bedrooms</option>
      <option value={1}>1+</option>
      <option value={2}>2+</option>
      <option value={3}>3+</option>
      <option value={4}>4+</option>
      <option value={5}>5+</option>
    </Select>
  );
}

BedroomInput.propTypes = {
  numOfBeds: PropTypes.number.isRequired,
  setNumOfBeds: PropTypes.func.isRequired
};
