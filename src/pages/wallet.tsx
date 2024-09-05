import { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  gql,
  useMutation,
  TypedDocumentNode,
  useReadQuery,
} from "@apollo/client";
import {
  AddFundsMutation,
  AddFundsMutationVariables,
  GetFundsQuery,
  GetFundsQueryVariables,
} from "./__generated__/wallet.types";
import { Guest } from "../__generated__/types";
import { Navigate, useLoaderData } from "react-router-dom";
import { preloadQuery } from "../apollo/preloadQuery";
import { PageContainer } from "../components/PageContainer";

export const ADD_FUNDS: TypedDocumentNode<
  AddFundsMutation,
  AddFundsMutationVariables
> = gql`
  mutation AddFunds($amount: Float!) {
    addFundsToWallet(amount: $amount) {
      amount
    }
  }
`;

const GET_FUNDS: TypedDocumentNode<GetFundsQuery, GetFundsQueryVariables> = gql`
  query GetFunds {
    me {
      id
      ... on Guest {
        funds
      }
    }
  }
`;

export function loader() {
  return preloadQuery(GET_FUNDS).toPromise();
}

export default function Wallet() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const [funds, setFunds] = useState(100);
  const [addFundsToWallet] = useMutation(ADD_FUNDS, {
    update(cache, { data }) {
      cache.modify<Guest>({
        id: cache.identify(user!),
        fields: {
          funds: () => data?.addFundsToWallet.amount ?? 0,
        },
      });
    },
  });

  const { me: user } = data;

  if (user.__typename !== "Guest") {
    return <Navigate to="/" />;
  }

  return (
    <PageContainer>
      <Center textAlign="center">
        <Stack spacing="4">
          <Heading as="h1">My wallet</Heading>
          <Text>
            Welcome to your wallet! Use this space to add and manage funds for
            your trips.
          </Text>
          <Box
            p={4}
            border="1px"
            borderColor="gray.100"
            borderRadius={4}
            textAlign="center"
          >
            <Heading size="2xl">¤{user.funds}</Heading>
            <Text>credit balance</Text>
          </Box>
          <Text fontWeight="semibold" textAlign="left">
            Add funds to your account
          </Text>
          <Flex w="100%">
            <Box>
              <InputGroup alignSelf="center">
                <InputLeftAddon bg="transparent" paddingRight="0">
                  @
                </InputLeftAddon>
                <NumberInput
                  name="numOfBeds"
                  min={1}
                  value={funds}
                  onChange={(_, val) => {
                    setFunds(val);
                  }}
                >
                  <NumberInputField
                    borderLeftWidth="0"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </InputGroup>
            </Box>
            <Button
              alignSelf="center"
              maxW="150px"
              ml={4}
              onClick={() =>
                addFundsToWallet({
                  variables: {
                    amount: funds,
                  },
                })
              }
            >
              Add funds
            </Button>
          </Flex>
        </Stack>
      </Center>
    </PageContainer>
  );
}
