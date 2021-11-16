import Layout from '../layouts/Layout';
import React, {useState} from 'react';
import {
  Button,
  Heading,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react';
import {IoWallet} from 'react-icons/io5';
import {gql, useMutation} from '@apollo/client';
import {useUser} from '../utils';

export const ADD_FUNDS = gql`
  mutation AddFunds($amount: Float!) {
    addFundsToWallet(amount: $amount) {
      code
      success
      message
      amount
    }
  }
`;

export default function Wallet() {
  const [funds, setFunds] = useState(1);
  const {user, setUser} = useUser();
  const [addFundsToWallet] = useMutation(ADD_FUNDS, {
    onCompleted: data => {
      setUser({...user, funds: data.addFundsToWallet.amount});
    }
  });

  return (
    <Layout>
      <Stack spacing="4">
        <Stack direction="row" spacing="4" align="center">
          <Heading as="h1">My Wallet</Heading>
          <IoWallet size="40" />
        </Stack>
        {user && <Text>Current balance: ${user.funds}</Text>}
        <InputGroup>
          <InputLeftAddon bg="transparent" paddingRight="0">
            $
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
        <Button
          maxW="150px"
          onClick={() =>
            addFundsToWallet({
              variables: {
                amount: funds
              }
            })
          }
        >
          Add Funds!
        </Button>
      </Stack>
    </Layout>
  );
}
