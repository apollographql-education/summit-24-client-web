import {
  gql,
  useMutation,
  TypedDocumentNode,
  MutationHookOptions,
} from "@apollo/client";

import "react-datepicker/dist/react-datepicker.css";
import {
  BookStayMutation,
  BookStayMutationVariables,
} from "./__generated__/BookStay.types";
import { BookStayIncomplete } from "./BookStayIncomplete";
import { BookStayAsHost } from "./BookStayAsHost";
import { BookStayLoggedOut } from "./BookStayLoggedOut";
import { BookStayInsufficientFunds } from "./BookStayInsufficientFunds";
import { BookStaySuccessful } from "./BookStaySuccessful";
import { BookStayForm } from "./BookStayForm";

// To provide TypeScript help for fields, use this type with cache.modify:
// e.g. cache.modify<Guest>(...)
// import { Guest } from "../__generated__/types";

export const BOOK_STAY: TypedDocumentNode<
  BookStayMutation,
  BookStayMutationVariables
> = gql`
  mutation BookStay($createBookingInput: CreateBookingInput) {
    createBooking(createBookingInput: $createBookingInput) {
      success
      message
      booking {
        id
        checkInDate
        checkOutDate
      }
    }
  }
`;

interface BookStayProps {
  listing: {
    id: string;
    costPerNight: number;
    bookings: Array<{ checkInDate: string; checkOutDate: string } | null>;
  };
  refetchQueries?: MutationHookOptions["refetchQueries"];
  userRole?: string;
}

export default function BookStay({
  listing,
  refetchQueries,
  userRole,
}: BookStayProps) {
  const [createBooking, { loading, error, data }] = useMutation(BOOK_STAY, {
    refetchQueries,
    /* Exercise 2
     * Docs on cache.readQuery
     * https://www.apollographql.com/docs/react/caching/cache-interaction#readquery
     *
     * Docs on cache.modify:
     * https://www.apollographql.com/docs/react/caching/cache-interaction#using-cachemodify
     *
     * cache.modify function utilities:
     * https://www.apollographql.com/docs/react/caching/cache-interaction#modifier-function-utilities
     */
    update: (cache) => {},
  });

  if (error) {
    return <BookStayIncomplete />;
  }

  if (userRole === undefined) {
    return <BookStayLoggedOut />;
  }

  if (userRole === "Host") {
    return <BookStayAsHost />;
  }

  if (data?.createBooking?.success === false) {
    return <BookStayInsufficientFunds message={data?.createBooking?.message} />;
  }

  if (data) {
    const { checkInDate, checkOutDate } = data.createBooking.booking!;

    return (
      <BookStaySuccessful
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
      />
    );
  }

  return (
    <BookStayForm
      listing={listing}
      submitting={loading}
      onSubmit={({ checkInDate, checkOutDate }) => {
        createBooking({
          variables: {
            createBookingInput: {
              listingId: listing.id,
              checkInDate: checkInDate.toISOString(),
              checkOutDate: checkOutDate.toISOString(),
            },
          },
        });
      }}
    />
  );
}
