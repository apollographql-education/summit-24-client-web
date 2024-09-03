import ListingForm from "../components/ListingForm";
import { Button, Center } from "@chakra-ui/react";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  gql,
  TypedDocumentNode,
  useMutation,
  useReadQuery,
} from "@apollo/client";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import {
  GetListingQuery,
  GetListingQueryVariables,
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "./__generated__/edit-listing.types";
import { preloadQuery } from "../apolloClient";
import { PageContainer } from "../components/PageContainer";

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
      ...ListingForm_amentities
    }
    listing(id: $id) {
      id
      ...ListingForm_listing
    }
  }
`;

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Invalid listing ID");
  }

  return preloadQuery(LISTING, { variables: { id } }).toPromise();
}

export default function EditListing() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);
  const listing = data.listing;

  const navigate = useNavigate();
  const [updateListing, { loading: submitting }] = useMutation(EDIT_LISTING, {
    onCompleted: () => {
      navigate(`/listing/${listing!.id}`);
    },
  });

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
