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
