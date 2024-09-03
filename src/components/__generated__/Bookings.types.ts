import * as GraphQLTypes from "../../__generated__/types";

export type Booking_bookingFragment = {
  __typename: "Booking";
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: GraphQLTypes.BookingStatus;
  listing: { __typename: "Listing"; id: string };
  locationReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
  hostReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
  guest: {
    __typename: "Guest";
    id: string;
    profilePicture: string;
    name: string;
  };
  guestReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
};

export type Bookings_bookingsFragment = {
  __typename: "Booking";
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: GraphQLTypes.BookingStatus;
  listing: { __typename: "Listing"; id: string };
  locationReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
  hostReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
  guest: {
    __typename: "Guest";
    id: string;
    profilePicture: string;
    name: string;
  };
  guestReview: {
    __typename: "Review";
    id: string;
    rating: number;
    text: string;
  } | null;
};
