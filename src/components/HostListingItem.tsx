import { Flex } from "@chakra-ui/react";
import { HostListingItemContainer } from "./HostListingItem/Container";
import { HostListingItemImage } from "./HostListingItem/Image";
import { HostListingItemTitle } from "./HostListingItem/Title";
import { HostListingItemBookings } from "./HostListingItem/Bookings";
import { HostListingItemRating } from "./HostListingItem/Rating";
import { HostListingItemLink } from "./HostListingItem/Link";

interface HostListingItemProps {
  listing: {
    id: string;
    title: string;
    photoThumbnail: string;
    numberOfUpcomingBookings: number;
    overallRating: number | null;
  };
}

export function HostListingItem({ listing }: HostListingItemProps) {
  return (
    <HostListingItemContainer>
      <Flex direction="row" flexWrap="wrap">
        <HostListingItemImage
          alt={listing.title}
          src={listing.photoThumbnail}
        />
        <Flex direction="column" px="4">
          <Flex direction="column" h="full">
            <HostListingItemTitle title={listing.title} />
            <Flex flexWrap="wrap" mt={4}>
              <HostListingItemBookings
                numberOfUpcomingBookings={listing.numberOfUpcomingBookings}
              />
              <HostListingItemRating overallRating={listing.overallRating} />
            </Flex>
          </Flex>
          <Flex>
            <HostListingItemLink to={`/listing/${listing.id}/edit`}>
              Edit
            </HostListingItemLink>
            <HostListingItemLink to={`/listing/${listing.id}`}>
              View
            </HostListingItemLink>
            <HostListingItemLink to={`/listing/${listing.id}/bookings`}>
              Manage Bookings
            </HostListingItemLink>
          </Flex>
        </Flex>
      </Flex>
    </HostListingItemContainer>
  );
}
