import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { PageContainer } from "./PageContainer";
import { useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import { PageError } from "./PageError";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import {
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables,
} from "./__generated__/HostProfile.types";
import { LogoutButton } from "./LogoutButton";

interface HostProfileProps {
  user: {
    __typename: "Host";
    name: string;
    profilePicture: string;
    profileDescription: string;
  };
}

const UPDATE_PROFILE: TypedDocumentNode<
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

export function HostProfile({ user }: HostProfileProps) {
  const [profileDescription, setProfileDescription] = useState(
    user.profileDescription,
  );

  const [updateProfileData, { loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted: ({ updateProfile: { user } }) => {
      if (user?.__typename === "Host") {
        setProfileDescription(user.profileDescription);
      }
    },
  });

  if (error) {
    return <PageError error={error!} />;
  }

  return (
    <PageContainer>
      <Center>
        <VStack direction="column" spacing="3" textAlign="center">
          <Heading as="h2">My profile</Heading>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={user.profilePicture}
            alt="profile picture"
          />
          <Text fontWeight="bold" fontSize="lg">
            {user.name}{" "}
            <Text
              as="span"
              textTransform="uppercase"
              fontWeight="normal"
              fontSize="sm"
            >
              (Host)
            </Text>
          </Text>
          <Box>
            <Text mb="1" fontWeight="bold" alignSelf="flex-start">
              About
            </Text>
            <Textarea
              placeholder="Profile description"
              width="400px"
              value={profileDescription}
              onChange={(e) => setProfileDescription(e.target.value)}
            />
          </Box>
          <Stack direction="row" spacing="2">
            <Button
              rightIcon={<IoCheckmark />}
              onClick={() => {
                return updateProfileData({
                  variables: {
                    updateProfileInput: { profileDescription },
                  },
                });
              }}
              isDisabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </Button>
            <LogoutButton />
          </Stack>
        </VStack>
      </Center>
    </PageContainer>
  );
}
