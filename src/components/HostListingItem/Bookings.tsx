import { Text } from "@chakra-ui/react";

interface HostListingItemBookingsProps {
  numberOfUpcomingBookings: number;
}

export function HostListingItemBookings({
  numberOfUpcomingBookings,
}: HostListingItemBookingsProps) {
  return <Text mr={4}>{numberOfUpcomingBookings} bookings</Text>;
}
