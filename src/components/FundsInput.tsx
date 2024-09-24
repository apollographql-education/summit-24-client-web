import {
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

interface FundsInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function FundsInput({ value, onChange }: FundsInputProps) {
  return (
    <InputGroup w="auto">
      <InputLeftAddon bg="transparent" paddingRight="0">
        @
      </InputLeftAddon>
      <NumberInput
        name="funds"
        min={1}
        value={value}
        onChange={(_, value) => onChange(value)}
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
  );
}
