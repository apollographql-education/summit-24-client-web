import * as GraphQLTypes from "../../__generated__/types";

export type Nav_currentUser_Guest_Fragment = {
  __typename: "Guest";
  id: string;
  profilePicture: string;
};

export type Nav_currentUser_Host_Fragment = {
  __typename: "Host";
  id: string;
  profilePicture: string;
};

export type Nav_currentUserFragment =
  | Nav_currentUser_Guest_Fragment
  | Nav_currentUser_Host_Fragment;
