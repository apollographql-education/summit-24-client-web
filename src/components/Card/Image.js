import PropTypes from 'prop-types';
import React from 'react';
import {Avatar, Image as ChakraImage} from '@chakra-ui/react';

export function Image({src, alt, isAvatar = false}) {
  const IMG_PROPS = {
    src,
    alt,
    h: 'full'
  };

  if (isAvatar) {
    return <Avatar {...IMG_PROPS} w="auto" />;
  }

  return <ChakraImage {...IMG_PROPS} w="100px" />;
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isAvatar: PropTypes.bool
};
