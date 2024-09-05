import { Flex } from "@chakra-ui/react";
import { fragments } from "../apollo/fragments";
import { gql } from "@apollo/client";
import { ListingItem_listingFragment } from "./__generated__/ListingItem.types";
import { ListingItemContainer } from "./ListingItem/Container";
import { ListingItemImage } from "./ListingItem/Image";
import { ListingItemDetails } from "./ListingItem/Details";
import { ListingItemTitle } from "./ListingItem/Title";
import { ListingItemDescription } from "./ListingItem/Description";
import { ListingItemLocationType } from "./ListingItem/LocationType";
import { ListingItemRating } from "./ListingItem/Rating";
import { ListingItemNumOfBeds } from "./ListingItem/NumOfBeds";
import { ListingItemCost } from "./ListingItem/Cost";

interface ListingItemProps {
  listing: ListingItem_listingFragment;
  checkInDate?: string;
  checkOutDate?: string;
}

fragments.register(gql`
  fragment ListingItem_listing on Listing {
    id
    title
    description
    photoThumbnail
    numOfBeds
    costPerNight
    overallRating
    locationType
  }
`);

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
          <ListingItemCost costPerNight={listing.costPerNight} />
        </Flex>
      </ListingItemDetails>
    </ListingItemContainer>
  );
}

function getListingParams(
  checkInDate: string | undefined,
  checkOutDate: string | undefined,
) {
  const searchParams = new URLSearchParams();

  if (checkInDate) {
    searchParams.set("startDate", checkInDate);
  }

  if (checkOutDate) {
    searchParams.set("endDate", checkOutDate);
  }

  return searchParams;
}
