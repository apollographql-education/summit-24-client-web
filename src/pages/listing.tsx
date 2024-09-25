import BookStay from "../components/BookStay";

import { Center, Divider, Flex, Stack } from "@chakra-ui/react";
import { GUEST_TRIPS } from "./upcoming-trips";
import { useParams } from "react-router-dom";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import {
  GetListingDetailsQuery,
  GetListingDetailsQueryVariables,
} from "./__generated__/listing.types";
import { PageContainer } from "../components/PageContainer";
import { ListingDetails } from "../components/Listing/Details";
import { ListingDescription } from "../components/Listing/Description";
import { ListingAmenities } from "../components/Listing/Amenities";
import { ListingHostDetails } from "../components/Listing/HostDetails";
import { ListingReviews } from "../components/Listing/Reviews";
import { ListingImage } from "../components/Listing/Image";
import { ListingHeader } from "../components/Listing/Header";

const LISTING: TypedDocumentNode<
  GetListingDetailsQuery,
  GetListingDetailsQueryVariables
> = gql`
  query GetListingDetails($id: ID!) {
    me {
      id
    }
    listing(id: $id) {
      id
      photoThumbnail
      amenities {
        ...ListingAmenities_amenities
      }
      reviews {
        ...ListingReviews_reviews
      }
      host {
        id
        ...ListingHostDetails_host
      }
      ...BookStay_listing
      ...ListingDescription_listing
      ...ListingDetails_listing
      ...ListingHeader_listing
    }
  }

  ${BookStay.fragments.listing}
  ${ListingAmenities.fragments.amenities}
  ${ListingDescription.fragments.listing}
  ${ListingDetails.fragments.listing}
  ${ListingHeader.fragments.listing}
  ${ListingHostDetails.fragments.host}
  ${ListingReviews.fragments.reviews}
`;

export function Listing() {
  const { id: idParam } = useParams();

  const { data } = useSuspenseQuery(LISTING, {
    variables: { id: idParam! },
  });
  const { listing, me: user } = data;

  if (!listing) {
    return <Center>Listing not found</Center>;
  }

  return (
    <PageContainer>
      <Stack direction="column" mb="12" spacing="6">
        <ListingHeader
          canEditListing={listing.host.id === user?.id}
          listing={listing}
        />
        <ListingImage src={listing.photoThumbnail} />
        <Flex direction="row" flexWrap="wrap">
          <Stack flex="1" direction="column" spacing="6" mr={8}>
            <ListingDetails listing={listing} />
            <Divider />
            <ListingDescription listing={listing} />
            <Divider />
            <ListingAmenities amenities={listing.amenities.filter(Boolean)} />
            <Divider />
            <ListingHostDetails host={listing.host} />
            <Divider />
            <ListingReviews reviews={listing.reviews.filter(Boolean)} />
          </Stack>

          <BookStay
            listing={listing}
            refetchQueries={[LISTING, { query: GUEST_TRIPS }]}
            userRole={user?.__typename}
          />
        </Flex>
      </Stack>
    </PageContainer>
  );
}
