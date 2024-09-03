import * as GraphQLTypes from "../../__generated__/types";

export type GetAllAmenitiesQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetAllAmenitiesQuery = {
  listingAmenities: Array<{
    __typename: "Amenity";
    id: string;
    category: GraphQLTypes.AmenityCategory;
    name: string;
  }>;
};

export type ListingForm_listingFragment = {
  __typename: "Listing";
  title: string;
  description: string;
  numOfBeds: number;
  locationType: GraphQLTypes.LocationType;
  photoThumbnail: string;
  costPerNight: number;
  amenities: Array<{ __typename: "Amenity"; id: string } | null>;
};

export type ListingForm_amentitiesFragment = {
  __typename: "Amenity";
  id: string;
  category: GraphQLTypes.AmenityCategory;
  name: string;
};

export type AmenitiesSelection_amentitiesFragment = {
  __typename: "Amenity";
  id: string;
  name: string;
};
