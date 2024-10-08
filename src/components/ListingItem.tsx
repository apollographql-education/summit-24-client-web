import { gql } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { ListingItemContainer } from "./ListingItem/Container";
import { ListingItemImage } from "./ListingItem/Image";
import { ListingItemDetails } from "./ListingItem/Details";
import { ListingItemTitle } from "./ListingItem/Title";
import { ListingItemDescription } from "./ListingItem/Description";
import { ListingItemLocationType } from "./ListingItem/LocationType";
import { ListingItemRating } from "./ListingItem/Rating";
import { ListingItemNumOfBeds } from "./ListingItem/NumOfBeds";
import { ListingItemCost } from "./ListingItem/Cost";
import { ListingItem_listingFragment } from "./__generated__/ListingItem.types";

interface ListingItemProps {
  listing: ListingItem_listingFragment;
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
          <ListingItemCost listing={listing} />
        </Flex>
      </ListingItemDetails>
    </ListingItemContainer>
  );
}

// This component uses colocated fragments to declare data requirements for this
// component. Learn more about colocated fragments in the docs:
// https://www.apollographql.com/docs/react/data/fragments#colocating-fragments
ListingItem.fragments = {
  listing: gql`
    fragment ListingItem_listing on Listing {
      id
      title
      description
      photoThumbnail
      numOfBeds
      overallRating
      locationType
      ...ListingItemCost_listing
    }

    ${ListingItemCost.fragments.listing}
  `,
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
