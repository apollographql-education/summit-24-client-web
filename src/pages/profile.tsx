import { Navigate } from "react-router-dom";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetUserQuery,
  GetUserQueryVariables,
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from "./__generated__/profile.types";
import { GuestProfile } from "../components/GuestProfile";
import { HostProfile } from "../components/HostProfile";

export const UPDATE_PROFILE: TypedDocumentNode<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
> = gql`
  mutation UpdateUserProfile($updateProfileInput: UpdateProfileInput) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      code
      success
      message
      user {
        id
        name
        profilePicture
        ... on Host {
          profileDescription
        }
      }
    }
  }
`;

const GET_USER: TypedDocumentNode<GetUserQuery, GetUserQueryVariables> = gql`
  query GetUser {
    me {
      id
      profilePicture
      name
      ... on Host {
        profileDescription
      }
    }
  }
`;

export function Profile() {
  const { data } = useSuspenseQuery(GET_USER, { errorPolicy: "ignore" });
  const user = data?.me;

  if (user?.__typename === "Guest") {
    return <GuestProfile user={user} />;
  }

  if (user?.__typename === "Host") {
    return <HostProfile user={user} />;
  }

  return <Navigate to="/login" />;
}
