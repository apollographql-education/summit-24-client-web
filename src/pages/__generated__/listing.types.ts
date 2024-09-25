import * as GraphQLTypes from "../../__generated__/types";

export type GetListingDetailsQueryVariables = GraphQLTypes.Exact<{
  id: GraphQLTypes.Scalars["ID"]["input"];
}>;

export type GetListingDetailsQuery = {
  me: { __typename: "Guest"; id: string } | { __typename: "Host"; id: string };
  listing: {
    __typename: "Listing";
    id: string;
    photoThumbnail: string;
    description: string;
    numOfBeds: number;
    locationType: GraphQLTypes.LocationType;
    title: string;
    overallRating: number | null;
    costPerNight: number;
    amenities: Array<{
      __typename: "Amenity";
      category: GraphQLTypes.AmenityCategory;
      name: string;
    } | null>;
    reviews: Array<{
      __typename: "Review";
      rating: number;
      text: string;
      author:
        | {
            __typename: "Guest";
            id: string;
            name: string;
            profilePicture: string;
          }
        | {
            __typename: "Host";
            id: string;
            name: string;
            profilePicture: string;
          };
    } | null>;
    host: {
      __typename: "Host";
      id: string;
      name: string;
      overallRating: number | null;
      profileDescription: string;
      profilePicture: string;
    };
    bookings: Array<{
      __typename: "Booking";
      id: string;
      checkInDate: string;
      checkOutDate: string;
    } | null>;
  } | null;
};
