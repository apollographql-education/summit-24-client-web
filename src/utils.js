import {useState} from 'react';

import {gql, useQuery} from '@apollo/client';
export const GET_USER = gql`
  query getMyProfile {
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
    }
  }
  ${LISTING_FRAGMENT}
`;
