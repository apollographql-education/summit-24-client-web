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

export const GUEST_TRIPS = gql`
  query getGuestBookings {
    guestBookings {
      checkInDate
      checkOutDate
      status
      listing {
        title
        photoThumbnail
      }
    }
  }
`;
