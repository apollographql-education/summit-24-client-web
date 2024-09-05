import { gql } from "@apollo/client";
import Stars from "./Stars";
import { Flex, Heading, Image, Text, Wrap } from "@chakra-ui/react";
import { IoBed } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fragments } from "../apollo/fragments";
import { ListingCard_listingFragment } from "./__generated__/ListingCard.types";

interface ListingCardProps {
  listing: ListingCard_listingFragment;
}

const listingCardFragment = gql`
  fragment ListingCard_listing on Listing {
    id
    title
    photoThumbnail
    numOfBeds
    overallRating
    locationType
    costPerNight
  }
`;

fragments.register(listingCardFragment);

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Flex
      direction="column"
      overflow="hidden"
      transition="0.3s all ease-in-out"
      opacity="95%"
      _hover={{
        cursor: "pointer",
        transform: "scale(1.1)",
        opacity: "100%",
      }}
      as={Link}
      to={`/listing/${listing.id}`}
      borderRadius="8"
    >
      <Image
        src={listing.photoThumbnail}
        alt={listing.title}
        boxSize="100%"
        maxH="200px"
        objectFit="cover"
        borderRadius="8"
      />
      <Flex direction="column" py="3" justify="space-between" minH="120px">
        <Text
          fontSize="sm"
          fontWeight={600}
          casing="uppercase"
          color="grey.dark"
          fontFamily="Source Code Pro"
        >
          {listing.locationType}
        </Text>
        <Heading as="h2" size="md">
          {listing.title}
        </Heading>
        <Wrap direction="row" justify="space-between" align="center">
          <Wrap spacing={4}>
            {listing.overallRating ? (
              <Stars size={20} rating={listing.overallRating} />
            ) : (
              <Text>No reviews yet</Text>
            )}
            <Flex align="center">
              <IoBed size={22} />
              <Text fontSize="lg" ml={1}>
                {listing.numOfBeds}
              </Text>
            </Flex>
          </Wrap>
          <Flex fontSize="lg" ml={6}>
            <Text fontWeight="bold"> ¤ {listing.costPerNight}</Text> / night
          </Flex>
        </Wrap>
      </Flex>
    </Flex>
  );
}
