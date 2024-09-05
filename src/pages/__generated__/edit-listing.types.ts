import * as GraphQLTypes from "../../__generated__/types";

export type UpdateListingMutationVariables = GraphQLTypes.Exact<{
  listingId: GraphQLTypes.Scalars["ID"]["input"];
  listing: GraphQLTypes.UpdateListingInput;
}>;

export type UpdateListingMutation = {
  updateListing: {
    __typename: "UpdateListingResponse";
    success: boolean;
    message: string;
    listing: {
      __typename: "Listing";
      id: string;
      title: string;
      description: string;
      numOfBeds: number;
      locationType: GraphQLTypes.LocationType;
      photoThumbnail: string;
      costPerNight: number;
      overallRating: number | null;
      amenities: Array<{
        __typename: "Amenity";
        id: string;
        category: GraphQLTypes.AmenityCategory;
        name: string;
      } | null>;
    } | null;
  };
};

export type GetListingQueryVariables = GraphQLTypes.Exact<{
  id: GraphQLTypes.Scalars["ID"]["input"];
}>;

export type GetListingQuery = {
  listingAmenities: Array<{
    __typename: "Amenity";
    id: string;
    name: string;
    category: GraphQLTypes.AmenityCategory;
  }>;
  listing: {
    __typename: "Listing";
    id: string;
    title: string;
    description: string;
    numOfBeds: number;
    locationType: GraphQLTypes.LocationType;
    photoThumbnail: string;
    costPerNight: number;
    amenities: Array<{ __typename: "Amenity"; id: string } | null>;
  } | null;
};
