import ListingForm from "../components/ListingForm";
import { Button, Center } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import { gql, TypedDocumentNode, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetListingQuery,
  GetListingQueryVariables,
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "./__generated__/edit-listing.types";
import { PageContainer } from "../components/PageContainer";
import { PageSpinner } from "../components/PageSpinner";
import { PageError } from "../components/PageError";

export const EDIT_LISTING: TypedDocumentNode<
  UpdateListingMutation,
  UpdateListingMutationVariables
> = gql`
  mutation UpdateListingMutation(
    $listingId: ID!
    $listing: UpdateListingInput!
  ) {
    updateListing(listingId: $listingId, listing: $listing) {
      success
      message
      listing {
        id
        title
        description
        numOfBeds
        locationType
        photoThumbnail
        costPerNight
        overallRating
        amenities {
          id
          category
          name
        }
      }
    }
  }
`;

export const LISTING: TypedDocumentNode<
  GetListingQuery,
  GetListingQueryVariables
> = gql`
  query GetListing($id: ID!) {
    listingAmenities {
      id
      name
      category
    }
    listing(id: $id) {
      id
      title
      description
      numOfBeds
      locationType
      photoThumbnail
      costPerNight
      amenities {
        id
      }
    }
  }
`;

export default function EditListing() {
  const { id } = useParams();

  const { data, loading, error } = useQuery(LISTING, {
    variables: { id: id! },
  });

  const listing = data?.listing;

  const navigate = useNavigate();
  const [updateListing, { loading: submitting }] = useMutation(EDIT_LISTING, {
    onCompleted: () => {
      navigate(`/listing/${listing!.id}`);
    },
  });

  if (loading) {
    return <PageSpinner />;
  }

  if (error) {
    return <PageError error={error} />;
  }

  if (!listing) {
    return <Center>Listing not found</Center>;
  }

  return (
    <PageContainer>
      <Button
        role="link"
        aria-label="Go back to previous page"
        onClick={() => navigate(-1)}
        leftIcon={<IoArrowBackOutline />}
        mb="4"
      >
        Back
      </Button>
      <ListingForm
        amenities={data.listingAmenities}
        listing={listing}
        submitting={submitting}
        onSubmit={(formValues) => {
          updateListing({
            variables: { listingId: listing.id, listing: formValues },
          });
        }}
      />
    </PageContainer>
  );
}
