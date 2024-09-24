import * as GraphQLTypes from "../../__generated__/types";

export type UpdateUserProfileMutationVariables = GraphQLTypes.Exact<{
  updateProfileInput?: GraphQLTypes.InputMaybe<GraphQLTypes.UpdateProfileInput>;
}>;

export type UpdateUserProfileMutation = {
  updateProfile: {
    __typename: "UpdateProfileResponse";
    code: number;
    success: boolean;
    message: string;
    user:
      | {
          __typename: "Guest";
          id: string;
          name: string;
          profilePicture: string;
        }
      | {
          __typename: "Host";
          profileDescription: string;
          id: string;
          name: string;
          profilePicture: string;
        }
      | null;
  };
};
