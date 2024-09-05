import * as GraphQLTypes from "../../__generated__/types";

export type GetCurrrentAndUpcomingBookingsForHostListingQueryVariables =
  GraphQLTypes.Exact<{
    listingId: GraphQLTypes.Scalars["ID"]["input"];
    upcomingStatus?: GraphQLTypes.InputMaybe<GraphQLTypes.BookingStatus>;
    currentStatus?: GraphQLTypes.InputMaybe<GraphQLTypes.BookingStatus>;
  }>;

export type GetCurrrentAndUpcomingBookingsForHostListingQuery = {
  upcomingBookings: Array<{
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
  } | null>;
  currentBooking: Array<{
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
  } | null>;
};
