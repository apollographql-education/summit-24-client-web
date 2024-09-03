import BedroomInput from "../components/BedroomInput";
import Hero from "../components/Hero";
import { ReactNode, Suspense, useState } from "react";
import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useLoaderData } from "react-router-dom";
import { format } from "date-fns";
import { getNextDate } from "../utils";
import { gql, QueryRef, TypedDocumentNode, useReadQuery } from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables,
} from "./__generated__/home.types";
import { DatePickerInput } from "../components/DatePickerInput";
import { PageSpinner } from "../components/PageSpinner";
import { ErrorBoundary } from "react-error-boundary";
import { PageError } from "../components/PageError";
import ListingCard from "../components/ListingCard";
import { preloadQuery } from "../apolloClient";

export const FEATURED_LISTINGS: TypedDocumentNode<
  GetFeaturedListingsQuery,
  GetFeaturedListingsQueryVariables
> = gql`
  query GetFeaturedListings {
    featuredListings {
      id
      ...ListingCard_listing
    }
  }
`;

const INPUT_PROPS = {
  size: "lg",
  width: "auto",
  maxWidth: "300px",
  marginTop: "2",
};

export function loader() {
  return preloadQuery(FEATURED_LISTINGS).toPromise();
}

export default function Home() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(getNextDate(today));
  const [numOfBeds, setNumOfBeds] = useState(1);

  return (
    <>
      <Hero>
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
      </Hero>
      <Suspense fallback={<PageSpinner />}>
        <ErrorBoundary
          fallbackRender={({ error }) => <PageError error={error} />}
        >
          <FeaturedListings queryRef={queryRef} />
        </ErrorBoundary>
      </Suspense>
    </>
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

interface FeaturedListingsProps {
  queryRef: QueryRef<
    GetFeaturedListingsQuery,
    GetFeaturedListingsQueryVariables
  >;
}

function FeaturedListings({ queryRef }: FeaturedListingsProps) {
  const { data } = useReadQuery(queryRef);

  return (
    <Container maxW="container.xl" mb={24} p={12} pt={8}>
      <Heading as="h1" fontSize="3xl" fontWeight="bold" mb={6}>
        Ideas for your next stellar trip
      </Heading>
      <SimpleGrid minChildWidth="255px" spacing={6}>
        {data.featuredListings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
