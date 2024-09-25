import { gql, TypedDocumentNode } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { LocationType } from "../__generated__/types";
import { ListingItemContainer } from "./ListingItem/Container";
import { ListingItemImage } from "./ListingItem/Image";
import { ListingItemDetails } from "./ListingItem/Details";
import { ListingItemTitle } from "./ListingItem/Title";
import { ListingItemDescription } from "./ListingItem/Description";
import { ListingItemLocationType } from "./ListingItem/LocationType";
import { ListingItemRating } from "./ListingItem/Rating";
import { ListingItemNumOfBeds } from "./ListingItem/NumOfBeds";

/* Exercise 3
 *
 * Docs on fragment colocation:
 * https://www.apollographql.com/docs/react/data/fragments#colocating-fragments
 */

interface ListingItemProps {
  listing: {
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    overallRating: number | null;
    locationType: LocationType;
  };
  checkInDate?: string;
  checkOutDate?: string;
}

export function ListingItem({
  listing,
  checkInDate,
  checkOutDate,
}: ListingItemProps) {
  return (
    <ListingItemContainer
      to={`/listing/${listing.id}/?${getListingParams(checkInDate, checkOutDate)}`}
    >
      <ListingItemImage src={listing.photoThumbnail} alt={listing.title} />
      <ListingItemDetails>
        <ListingItemLocationType locationType={listing.locationType} />
        <ListingItemTitle title={listing.title} />
        <ListingItemDescription description={listing.description} />
        <Flex direction="row" align="center">
          <ListingItemRating rating={listing.overallRating} />
          <ListingItemNumOfBeds numOfBeds={listing.numOfBeds} />
        </Flex>
      </ListingItemDetails>
    </ListingItemContainer>
  );
}

ListingItem.fragments = {
  // TODO: Add a fragment here to declare data needs for the component
  listing: gql`` as TypedDocumentNode<unknown>,
};

function getListingParams(
  checkInDate: string | undefined,
  checkOutDate: string | undefined,
) {
  const searchParams = new URLSearchParams();

  if (checkInDate) {
    searchParams.set("checkInDate", checkInDate);
  }

  if (checkOutDate) {
    searchParams.set("checkOutDate", checkOutDate);
  }

  return searchParams;
}
