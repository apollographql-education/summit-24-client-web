import Bookings from "../components/Bookings";
import { gql, TypedDocumentNode, useReadQuery } from "@apollo/client";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables,
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables,
} from "./__generated__/past-bookings.types";
import { BookingStatus } from "../__generated__/types";
import { preloadQuery } from "../apollo/preloadQuery";

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitGuestReviewMutation,
  SubmitGuestReviewMutationVariables
> = gql`
  mutation SubmitGuestReview($bookingId: ID!, $guestReview: ReviewInput!) {
    submitGuestReview(bookingId: $bookingId, guestReview: $guestReview) {
      success
      message
      guestReview {
        id
        text
        rating
      }
    }
  }
`;

export const HOST_BOOKINGS: TypedDocumentNode<
  GetPastBookingsForHostListingQuery,
  GetPastBookingsForHostListingQueryVariables
> = gql`
  query GetPastBookingsForHostListing($listingId: ID!, $status: BookingStatus) {
    bookingsForListing(listingId: $listingId, status: $status) {
      id
      ...Bookings_bookings
    }
  }
`;

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  if (!id) {
    throw new Error("Invalid booking ID");
  }

  return preloadQuery(HOST_BOOKINGS, {
    variables: {
      listingId: id,
      status: BookingStatus.COMPLETED,
    },
  }).toPromise();
}

export default function HostBookings() {
  const queryRef = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { data } = useReadQuery(queryRef);

  return <Bookings bookings={data.bookingsForListing.filter(Boolean)} isPast />;
}
