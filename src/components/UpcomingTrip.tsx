import { Tag, Wrap } from "@chakra-ui/react";
import { Content, Image } from "./Card";
import { gql, TypedDocumentNode } from "@apollo/client";
import {
  SubmitHostAndLocationReviewsMutation,
  SubmitHostAndLocationReviewsMutationVariables,
} from "./__generated__/UpcomingTrip.types";
import { Card } from "./Card/Card";
import { BookingStatus } from "../__generated__/types";

export const SUBMIT_REVIEW: TypedDocumentNode<
  SubmitHostAndLocationReviewsMutation,
  SubmitHostAndLocationReviewsMutationVariables
> = gql`
  mutation SubmitHostAndLocationReviews(
    $bookingId: ID!
    $hostReview: ReviewInput!
    $locationReview: ReviewInput!
  ) {
    submitHostAndLocationReviews(
      bookingId: $bookingId
      hostReview: $hostReview
      locationReview: $locationReview
    ) {
      success
      message
      hostReview {
        id
        text
        rating
      }
      locationReview {
        id
        text
        rating
      }
    }
  }
`;

interface UpcomingTripProps {
  trip: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: BookingStatus;
    listing: {
      id: string;
      photoThumbnail: string;
      title: string;
    };
  };
}

export function UpcomingTrip({ trip }: UpcomingTripProps) {
  return (
    <Card>
      <Wrap align="center" spacing="4">
        <Image
          src={trip.listing.photoThumbnail}
          alt={trip.listing.title}
          w="auto"
          h="200px"
        />
        <Content
          title={trip.listing.title}
          checkInDate={trip.checkInDate}
          checkOutDate={trip.checkOutDate}
          wrapperProps={{ ml: "4" }}
        >
          {trip.status === "CURRENT" ? (
            <Tag
              h="18px"
              w="300px"
              rounded="xl"
              bgColor="#425C0A"
              color="white"
              justifyContent="center"
            >
              You&apos;re staying here right now!
            </Tag>
          ) : null}
        </Content>
      </Wrap>
    </Card>
  );
}
