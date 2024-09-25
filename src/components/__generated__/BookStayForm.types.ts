import * as GraphQLTypes from "../../__generated__/types";

export type BookStayForm_listingFragment = {
  __typename: "Listing";
  costPerNight: number;
  bookings: Array<{
    __typename: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
  } | null>;
};
