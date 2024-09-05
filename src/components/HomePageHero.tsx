import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { DatePickerInput } from "./DatePickerInput";
import { getNextDate } from "../utils";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Background from "../assets/homepage-bg.png";
import BedroomInput from "./BedroomInput";

const INPUT_PROPS = {
  size: "lg",
  width: "auto",
  maxWidth: "300px",
  marginTop: "2",
};

export function HomePageHero() {
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(getNextDate(today));
  const [numOfBeds, setNumOfBeds] = useState(1);

  return (
    <Box bgColor="brand.midnight">
      <Box
        bgImage={Background}
        bgRepeat="no-repeat"
        minH="500px"
        maxW="2000px"
        mx="auto"
        backgroundSize="cover"
      >
        <Center minHeight="500px">
          <Container maxWidth="100%">
            <Flex
              direction="column"
              justify="space-between"
              minH="225px"
              align="center"
            >
              <Heading as="h1" size="3xl" mb={4} color="white">
                Your home away from homeworld
              </Heading>
              <Heading as="h2" size="md" mb={10} fontWeight={500} color="white">
                Let&apos;s plan your next space adventure!
              </Heading>
              <Stack
                spacing={4}
                p={6}
                borderRadius={3}
                direction={["column", "row"]}
                maxWidth="862px"
                alignItems="flex-end"
                bgColor="white"
              >
                <InputContainer label="Check-in Date">
                  <DatePickerInput
                    {...INPUT_PROPS}
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    selected={startDate}
                    width="150px"
                  />
                </InputContainer>
                <InputContainer label="Check-out Date">
                  <DatePickerInput
                    {...INPUT_PROPS}
                    today={today}
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    minDate={today < startDate ? startDate : today}
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    width="150px"
                  />
                </InputContainer>
                <BedroomInput
                  {...INPUT_PROPS}
                  numOfBeds={numOfBeds}
                  setNumOfBeds={setNumOfBeds}
                />
                <Button
                  as={Link}
                  to={`/search/?startDate=${format(
                    startDate,
                    "MM-dd-yyyy",
                  )}&endDate=${format(
                    endDate,
                    "MM-dd-yyyy",
                  )}&numOfBeds=${numOfBeds}`}
                >
                  Find a place
                </Button>
              </Stack>
            </Flex>
          </Container>
        </Center>
      </Box>
    </Box>
  );
}

interface InputContainerProps {
  label: string;
  children: ReactNode;
}

function InputContainer({ label, children }: InputContainerProps) {
  return (
    <Stack direction="column" spacing={2}>
      <Text as="label" fontSize="large" fontWeight="bold">
        {label}
        {children}
      </Text>
    </Stack>
  );
}
