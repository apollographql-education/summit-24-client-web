import { gql, useFragment, TypedDocumentNode } from "@apollo/client";
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

/* Exercise 5
 *
 * Docs for useFragment:
 * https://www.apollographql.com/docs/react/data/fragments#useFragment
 *
 * Docs on @nonreactive:
 * https://www.apollographql.com/docs/react/data/directives#nonreactive
 */

export function ListingItem({
  listing,
  checkInDate,
  checkOutDate,
}: ListingItemProps) {
  const { data, complete } = useFragment({
    fragment: ListingItem.fragments.listing,
    from: listing,
  });

  if (!complete) {
    return null;
  }

  return (
    <ListingItemContainer
      to={`/listing/${data.id}/?${getListingParams(checkInDate, checkOutDate)}`}
    >
      <ListingItemImage src={data.photoThumbnail} alt={data.title} />
      <ListingItemDetails>
        <ListingItemLocationType locationType={data.locationType} />
        <ListingItemTitle title={data.title} />
        <ListingItemDescription description={data.description} />
        <Flex direction="row" align="center">
          <ListingItemRating rating={data.overallRating} />
          <ListingItemNumOfBeds numOfBeds={data.numOfBeds} />
          <ListingItemCost costPerNight={data.costPerNight} />
        </Flex>
      </ListingItemDetails>
    </ListingItemContainer>
  );
}

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
      costPerNight
    }
  ` as TypedDocumentNode<ListingItem_listingFragment>,
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
