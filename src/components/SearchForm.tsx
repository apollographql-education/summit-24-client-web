import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { DatePickerInput } from "./DatePickerInput";
import BedroomInput from "./BedroomInput";
import { format } from "date-fns";

interface SearchFormProps {
  checkInDate: string;
  checkOutDate: string;
  numOfBeds: number;
  onChange: (values: FormValues) => void;
}

type FormValues = {
  checkInDate: string;
  checkOutDate: string;
  numOfBeds: number;
};

function formatDate(date: Date) {
  return format(date, "MM-dd-yyyy");
}

export function SearchForm({
  checkInDate: checkInDateString,
  checkOutDate: checkOutDateString,
  numOfBeds,
  onChange,
}: SearchFormProps) {
  const today = new Date();
  const checkInDate = new Date(checkInDateString);
  const checkOutDate = new Date(checkOutDateString);

  function handleChange(values: Partial<FormValues>) {
    onChange({
      checkInDate: checkInDateString,
      checkOutDate: checkOutDateString,
      numOfBeds,
      ...values,
    });
  }

  function setCheckInDate(date: Date) {
    handleChange({ checkInDate: formatDate(date) });
  }

  function setCheckOutDate(date: Date) {
    handleChange({ checkOutDate: formatDate(date) });
  }

  return (
    <Center>
      <Stack>
        <Heading as="h1" mb="6" textAlign="center">
          Your search
        </Heading>
        <Box>
          <Flex
            minWidth="100%"
            mb="4"
            align="flex-end"
            flexWrap="wrap"
            sx={{ gap: "24px" }}
          >
            <Stack direction="column" spacing={2}>
              <Text as="label" fontSize="large" fontWeight="bold">
                Check-in Date
              </Text>
              <DatePickerInput
                size="lg"
                today={today}
                startDate={checkInDate}
                endDate={checkOutDate}
                setStartDate={setCheckInDate}
                setEndDate={setCheckOutDate}
                selected={checkInDate}
                width="150px"
              />
            </Stack>
            <Stack direction="column" spacing={2}>
              <Text as="label" fontSize="large" fontWeight="bold">
                Check-out Date
              </Text>
              <DatePickerInput
                size="lg"
                today={today}
                startDate={checkInDate}
                endDate={checkOutDate}
                setStartDate={setCheckInDate}
                setEndDate={setCheckOutDate}
                selected={checkOutDate}
                minDate={today < checkInDate ? checkInDate : today}
                onChange={setCheckOutDate}
                width="150px"
              />
            </Stack>
            <BedroomInput
              size="lg"
              w="150px"
              numOfBeds={numOfBeds}
              setNumOfBeds={(numOfBeds) => handleChange({ numOfBeds })}
            />
          </Flex>
        </Box>
      </Stack>
    </Center>
  );
}
