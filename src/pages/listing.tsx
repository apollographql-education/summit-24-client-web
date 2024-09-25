import BookStay from "../components/BookStay";

import { Center, Divider, Flex, Stack } from "@chakra-ui/react";
import { GUEST_TRIPS } from "./upcoming-trips";
import { useParams } from "react-router-dom";
import { gql, TypedDocumentNode, useQuery } from "@apollo/client";
import {
  GetListingDetailsQuery,
  GetListingDetailsQueryVariables,
} from "./__generated__/listing.types";
import { PageContainer } from "../components/PageContainer";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";
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
      title
      description
      photoThumbnail
      numOfBeds
      costPerNight
      locationType
      amenities {
        name
        category
      }
      overallRating
      reviews {
        text
        author {
          id
          name
          profilePicture
        }
        rating
      }
      host {
        id
        name
        profilePicture
        profileDescription
        overallRating
      }
      bookings {
        id
        checkInDate
        checkOutDate
      }
    }
  }
`;

export default function Listing() {
  const { id: idParam } = useParams();

  const { data, loading, error } = useQuery(LISTING, {
    variables: { id: idParam! },
  });
  const user = data?.me;

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  if (!data?.listing) {
    return <Center>Listing not found</Center>;
  }

  const { listing } = data;

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
            <ListingAmenities listing={listing} />
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
