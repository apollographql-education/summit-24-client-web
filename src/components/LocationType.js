import PropTypes from 'prop-types';
import React from 'react';
import {IoBonfire, IoCube, IoFish, IoHome, IoRocket} from 'react-icons/io5';

export default function LocationType({locType, size}) {
  const Icon = ({locType, size = '1em'}) => {
    switch (locType) {
      case 'SPACESHIP':
        return <IoRocket size={size} />;
      case 'HOUSE':
        return <IoHome size={size} />;
      case 'CAMPSITE':
        return <IoBonfire size={size} />;
      case 'APARTMENT':
        return <IoCube size={size} />;
      case 'ROOM':
        return <IoFish size={size} />;
      default:
        return null;
    }
  };
  Icon.propTypes = {
    locType: PropTypes.string,
    size: PropTypes.string
  };

  return <Icon locType={locType} size={size} />;
}

LocationType.propTypes = {
  locType: PropTypes.string,
  size: PropTypes.string
};
