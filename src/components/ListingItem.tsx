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
import { LocationType } from "../__generated__/types";

interface ListingItemProps {
  listing: {
    id: string;
    title: string;
    description: string;
    photoThumbnail: string;
    numOfBeds: number;
    costPerNight: number;
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
    searchParams.set("checkInDate", checkInDate);
  }

  if (checkOutDate) {
    searchParams.set("checkOutDate", checkOutDate);
  }

  return searchParams;
}
