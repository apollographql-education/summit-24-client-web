import DatePicker from 'react-datepicker';
import {useState} from 'react';

import {gql, useQuery} from '@apollo/client';
export const GET_USER = gql`
  query GetMyProfile {
    me {
      id
      name
      profilePicture
      ... on Host {
        profileDescription
      }
      ... on Guest {
        funds
      }
    }
  }
`;

export function useUser() {
  const [user, setUser] = useState();

  const {loading, error} = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    onCompleted: ({me}) => {
      setUser({...me});
    }
  });

  return {
    user,
    setUser,
    loading,
    error
  };
}

export const LISTING_FRAGMENT = gql`
  fragment ListingFragment on Listing {
    id
    title
    photoThumbnail
    numOfBeds
    description
    overallRating
    costPerNight
    locationType
  }
`;

export const HOST_LISTINGS = gql`
  query GetHostListings {
    hostListings {
      ...ListingFragment
      numberOfUpcomingBookings
    }
  }
  ${LISTING_FRAGMENT}
`;

export const getDatePickerProps = ({
  today,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  ...props
}) => {
  return {
    type: 'date',
    as: DatePicker,
    dateFormat: 'MM-dd-yyyy',
    minDate: today,
    startDate,
    endDate,
    onChange: date => {
      setStartDate(date);

      // match end date with start date if start date was changed to be farther in the future than the current end date
      if (endDate < date) {
        setEndDate(date);
      }
    },
    ...props
  };
};
