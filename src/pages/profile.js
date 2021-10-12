import Layout from '../layouts/Layout';
import React, {useEffect, useRef} from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import {IoCheckmark, IoExit} from 'react-icons/io5';
import {Link} from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';
import {useUser} from '../utils';

export const UPDATE_PROFILE = gql`
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

export default function Profile() {
  const {user, setUser} = useUser();
  const inputNameRef = useRef();
  const inputProfilePicRef = useRef();
  const txtProfileDescRef = useRef();
  const [updateProfileData, {data, loading, error}] =
    useMutation(UPDATE_PROFILE);

  useEffect(() => {
    if (data && data.updateProfile.success) {
      setUser({...data.updateProfile.user});
      const {name, profileDescription, profilePicture} =
        data.updateProfile.user;

      inputNameRef.current.value = name;
      inputProfilePicRef.current.value = profilePicture;
      txtProfileDescRef.current.value = profileDescription;
    }
  }, [data, setUser]);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <Layout containerSize="container.lg">
      {loading && <p>Loading...</p>}
      {user && (
        <Stack direction="column" spacing="3">
          <Heading as="h2">My Profile</Heading>
          <Image
            boxSize="200px"
            objectFit="cover"
            src={user.profilePicture}
            alt="profile picture"
          />
          <Box>
            <Text mb="1" fontWeight="bold">
              Name:
            </Text>
            <Input
              ref={inputNameRef}
              placeholder="Name"
              defaultValue={user.name}
            />
          </Box>
          <Box>
            <Text mb="1" fontWeight="bold">
              Profile picture url:
            </Text>
            <Input
              ref={inputProfilePicRef}
              placeholder="Profile Picture"
              defaultValue={user.profilePicture}
            />
          </Box>
          <Box>
            <Text mb="1" fontWeight="bold">
              Profile Type: {user.__typename}
            </Text>
          </Box>
          <Box>
            <Text mb="1" fontWeight="bold">
              Profile Description:
            </Text>
            {user.__typename === 'Host' && (
              <Textarea
                ref={txtProfileDescRef}
                placeholder="Profile description"
                defaultValue={user.profileDescription}
              />
            )}
          </Box>
          <Stack direction="row" spacing="2">
            <Button
              rightIcon={<IoCheckmark />}
              onClick={() =>
                updateProfileData({
                  variables: {
                    updateProfileInput: {
                      name: inputNameRef.current.value,
                      profilePicture: inputProfilePicRef.current.value,
                      profileDescription: txtProfileDescRef.current.value
                    }
                  }
                })
              }
              colorScheme="green"
            >
              Update Profile
            </Button>
            <Button
              as={Link}
              to="login"
              onClick={() => {
                localStorage.removeItem('token');
                setUser({user: null});
              }}
              rightIcon={<IoExit />}
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      )}
    </Layout>
  );
}
