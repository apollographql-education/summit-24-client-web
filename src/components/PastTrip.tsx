import { Image, useToast, VStack } from "@chakra-ui/react";
import { Content } from "./Card";
import { HostAndLocationReview } from "./TripReviews";
import { gql, TypedDocumentNode, useMutation } from "@apollo/client";
import {
  SubmitHostAndLocationReviewsMutation,
  SubmitHostAndLocationReviewsMutationVariables,
} from "./__generated__/PastTrip.types";
import { Card } from "./Card/Card";

interface PastTripProps {
  trip: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    listing: {
      __typename: "Listing";
      id: string;
      photoThumbnail: string;
      title: string;
    };
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
    guestReview: {
      __typename: "Review";
      id: string;
      rating: number;
      text: string;
    } | null;
  };
}

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

export function PastTrip({ trip }: PastTripProps) {
  const toast = useToast();

  const [submitReview] = useMutation(SUBMIT_REVIEW, {
    onCompleted: ({ submitHostAndLocationReviews }) => {
      submitHostAndLocationReviews.success
        ? toast({
            title: "Your review has been submitted.",
            description: "Thank you!",
            status: "success",
            duration: 9000,
            isClosable: true,
          })
        : toast({
            title: "Something went wrong.",
            description: "Try again later.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
    },
  });

  return (
    <Card>
      <VStack>
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
          wrapperProps={{ w: "355px" }}
        />
      </VStack>
      <HostAndLocationReview
        locationReview={trip.locationReview}
        hostReview={trip.hostReview}
        guestReview={trip.guestReview}
        onSubmitReview={(reviews) => {
          submitReview({
            variables: {
              ...reviews,
              bookingId: trip.id,
            },
            // NOTE: for the scope of this project, we've opted for the simpler refetch approach
            // another, more optimized option is to update the cache directly -- https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly
            // refetchQueries: [{ query: PAST_GUEST_TRIPS }],
          });
        }}
      />
    </Card>
  );
}
