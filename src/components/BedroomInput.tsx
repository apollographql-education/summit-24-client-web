import { Select, SelectProps, Stack, Text } from "@chakra-ui/react";

interface BedroomInputProps extends SelectProps {
  numOfBeds: number;
  setNumOfBeds: (beds: number) => void;
}

export default function BedroomInput({
  numOfBeds,
  setNumOfBeds,
  ...props
}: BedroomInputProps) {
  return (
    <Stack direction="column" spacing={2}>
      <Text as="label" fontSize="large" fontWeight="bold">
        Bedrooms
        <Select
          onChange={(e) => setNumOfBeds(Number(e.target.value))}
          value={numOfBeds}
          mt="2"
          {...props}
        >
          <option disabled>Number of bedrooms</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5+</option>
        </Select>
      </Text>
    </Stack>
  );
}
