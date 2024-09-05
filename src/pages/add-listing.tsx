import ListingForm from "../components/ListingForm";
import { Button } from "@chakra-ui/react";
import { HOST_LISTINGS } from "./listings";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  gql,
  TypedDocumentNode,
  useMutation,
  useReadQuery,
} from "@apollo/client";
import {
  CreateListingMutation,
  CreateListingMutationVariables,
  GetListingAmenitiesQuery,
  GetListingAmenitiesQueryVariables,
} from "./__generated__/add-listing.types";
import { type LocationType } from "../__generated__/types";
import { preloadQuery } from "../apollo/preloadQuery";
import { PageContainer } from "../components/PageContainer";

export const CREATE_LISTING: TypedDocumentNode<
  CreateListingMutation,
  CreateListingMutationVariables
> = gql`
  mutation CreateListingMutation($listing: CreateListingInput!) {
    createListing(listing: $listing) {
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
        amenities {
          id
          category
          name
        }
      }
    }
  }
`;

const GET_LISTING_AMENITIES: TypedDocumentNode<
  GetListingAmenitiesQuery,
  GetListingAmenitiesQueryVariables
> = gql`
  query GetListingAmenities {
    listingAmenities {
      id
      ...ListingForm_amentities
    }
  }
`;

export function loader() {
  return preloadQuery(GET_LISTING_AMENITIES).toPromise();
}

export default function CreateListing() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  const navigate = useNavigate();
  const [createListing, { loading }] = useMutation(CREATE_LISTING, {
    onCompleted: () => {
      navigate("/listings");
    },
    update: (cache, { data }) => {
      // update the cache to add our new listing
      // https://www.apollographql.com/docs/react/api/react/hooks/#update
      const query = cache.readQuery({ query: HOST_LISTINGS });

      if (query?.hostListings) {
        cache.writeQuery({
          query: HOST_LISTINGS,
          data: {
            hostListings: [...query.hostListings, data!.createListing.listing],
          },
        });
      }
    },
  });

  return (
    <PageContainer>
      <Button as={Link} to="/listings" leftIcon={<IoArrowBackOutline />} mb="4">
        Back to listings
      </Button>
      <ListingForm
        submitting={loading}
        amenities={data.listingAmenities}
        listing={{
          title: "",
          description: "",
          numOfBeds: 1,
          locationType: "" as LocationType,
          photoThumbnail: "",
          amenities: [],
          costPerNight: 100,
        }}
        onSubmit={(formValues) => {
          createListing({ variables: { listing: formValues } });
        }}
      />
    </PageContainer>
  );
}
