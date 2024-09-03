import Stars from "./Stars";
import { Box, Divider, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { IoBed } from "react-icons/io5";
import { Link } from "react-router-dom";
import { fragments } from "../fragments.ts";
import { gql, TypedDocumentNode } from "@apollo/client";
import { ListingCell_listingFragment } from "./__generated__/ListingCell.types.ts";

interface ListingCellProps {
  listing: ListingCell_listingFragment;
  to: string;
}

const listingCellFragment: TypedDocumentNode<ListingCell_listingFragment> = gql`
  fragment ListingCell_listing on Listing {
    title
    description
    photoThumbnail
    numOfBeds
    costPerNight
    overallRating
    locationType
  }
`;

fragments.register(listingCellFragment);

export default function ListingCell({ listing, to }: ListingCellProps) {
  return (
    <>
      <Box
        overflow="hidden"
        width="100%"
        transition="0.3s all ease-in-out"
        opacity="95%"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.1)",
          opacity: "100%",
        }}
        as={Link}
        to={to}
        mb="2"
      >
        <Flex direction="row" justify="space-between" minH="120px" maxH="200px">
          <Image
            src={listing.photoThumbnail}
            alt={listing.title}
            objectFit="cover"
            width="320px"
            maxW="320px"
            borderRadius="8"
          />
          <Flex
            direction="column"
            ml={6}
            justify="space-around"
            minH="120px"
            width="100%"
            sx={{ gap: "24px" }}
          >
            <Text
              fontSize="sm"
              fontWeight={600}
              casing="uppercase"
              color="grey.dark"
              fontFamily="Source Code Pro"
            >
              {listing.locationType}
            </Text>
            <Flex direction="row" justify="space-between">
              <Heading as="h2" size="md">
                {listing.title}
              </Heading>
            </Flex>
            <Text
              fontSize="lg"
              fontWeight="regular"
              mr="1"
              maxWidth="650px"
              noOfLines={2}
            >
              {listing.description}
            </Text>
            <Flex direction="row" justify="space-between">
              <Flex direction="row" align="center">
                {listing.overallRating ? (
                  <Stars size={20} rating={listing.overallRating} />
                ) : (
                  <Text>No reviews yet</Text>
                )}
                <Flex ml={6} align="center">
                  <IoBed size={22} />
                  <Text fontSize="lg" ml={1}>
                    {listing.numOfBeds}
                  </Text>
                </Flex>
                <Flex fontSize="lg" ml={6}>
                  <Text fontWeight="bold"> ¤ {listing.costPerNight}</Text> /
                  night
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Divider />
    </>
  );
}
