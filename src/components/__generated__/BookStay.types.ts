import * as GraphQLTypes from "../../__generated__/types";

export type BookStayMutationVariables = GraphQLTypes.Exact<{
  createBookingInput?: GraphQLTypes.InputMaybe<GraphQLTypes.CreateBookingInput>;
}>;

export type BookStayMutation = {
  createBooking: {
    __typename: "CreateBookingResponse";
    success: boolean;
    message: string;
    booking: {
      __typename: "NewBookingResponse";
      id: string;
      checkInDate: string;
      checkOutDate: string;
    } | null;
  };
};

export type GetUserIdQueryVariables = GraphQLTypes.Exact<{
  [key: string]: never;
}>;

export type GetUserIdQuery = {
  me: { __typename: "Guest"; id: string } | { __typename: "Host"; id: string };
};

export type BookStay_listingFragment = {
  __typename: "Listing";
  id: string;
  costPerNight: number;
  bookings: Array<{
    __typename: "Booking";
    id: string;
    checkInDate: string;
    checkOutDate: string;
  } | null>;
};
