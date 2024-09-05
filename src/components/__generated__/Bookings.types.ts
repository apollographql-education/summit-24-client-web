import * as GraphQLTypes from "../../__generated__/types";

export type Booking_bookingFragment = {
  __typename: "Booking";
  id: string;
  checkInDate: string;
  checkOutDate: string;
  status: GraphQLTypes.BookingStatus;
  guest: {
    __typename: "Guest";
    id: string;
    profilePicture: string;
    name: string;
  };
};
