import { useState } from "react";
import { Button, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { gql, useMutation, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  AddFundsMutation,
  AddFundsMutationVariables,
  GetFundsQuery,
  GetFundsQueryVariables,
} from "./__generated__/wallet.types";
import { Guest } from "../__generated__/types";
import { Navigate } from "react-router-dom";
import { PageContainer } from "../components/PageContainer";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";
import { FundsInput } from "../components/FundsInput";
import { FundsBalance } from "../components/FundsBalance";

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

export function Wallet() {
  const { data, loading, error } = useQuery(GET_FUNDS);
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

  const user = data?.me;

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  if (user?.__typename !== "Guest") {
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
          <FundsBalance funds={user.funds} />
          <Text fontWeight="semibold" textAlign="left">
            Add funds to your account
          </Text>
          <Flex w="100%">
            <FundsInput value={funds} onChange={setFunds} />
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
