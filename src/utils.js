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
  const {data, loading, error} = useQuery(GET_USER, {fetchPolicy: 'no-cache'});
  const [user, setUser] = useState();

  if (data && !user) {
    setUser(data.me);
  }

  return {
    user,
    setUser,
    loading,
    error
  };
}
