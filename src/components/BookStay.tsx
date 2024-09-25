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
  GetUserIdQuery,
} from "./__generated__/BookStay.types";
import { BookStayIncomplete } from "./BookStayIncomplete";
import { BookStayAsHost } from "./BookStayAsHost";
import { BookStayLoggedOut } from "./BookStayLoggedOut";
import { BookStayInsufficientFunds } from "./BookStayInsufficientFunds";
import { BookStaySuccessful } from "./BookStaySuccessful";
import { BookStayForm } from "./BookStayForm";
import { Guest } from "../__generated__/types";
import { BookStay_listingFragment } from "./__generated__/BookStay.types";

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
  listing: BookStay_listingFragment;
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
    update: (cache) => {
      const data = cache.readQuery<GetUserIdQuery>({
        query: gql`
          query GetUserId {
            me {
              id
            }
          }
        `,
      });

      if (data?.me) {
        cache.modify<Guest>({
          id: cache.identify(data.me),
          fields: {
            funds(_, { DELETE }) {
              return DELETE;
            },
          },
        });
      }
    },
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

BookStay.fragments = {
  listing: gql`
    fragment BookStay_listing on Listing {
      id
      ...BookStayForm_listing
    }

    ${BookStayForm.fragments.listing}
  ` as TypedDocumentNode<BookStay_listingFragment>,
};
