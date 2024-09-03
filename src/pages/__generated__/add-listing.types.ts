import * as GraphQLTypes from "../../__generated__/types";

export type CreateListingMutationVariables = GraphQLTypes.Exact<{
  listing: GraphQLTypes.CreateListingInput;
}>;

export type CreateListingMutation = {
  createListing: {
    __typename: "CreateListingResponse";
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
      amenities: Array<{
        __typename: "Amenity";
        id: string;
        category: GraphQLTypes.AmenityCategory;
        name: string;
      } | null>;
    } | null;
  };
};

export type GetListingAmenitiesQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetListingAmenitiesQuery = {
  listingAmenities: Array<{
    __typename: "Amenity";
    id: string;
    category: GraphQLTypes.AmenityCategory;
    name: string;
  }>;
};
