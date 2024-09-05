import { Box, Text, Wrap } from "@chakra-ui/react";
import { Content, Image } from "./Card";

import { Card } from "./Card/Card";
import { BookingStatus } from "../__generated__/types";

interface BookingProps {
  booking: {
    id: string;
    checkInDate: string;
    checkOutDate: string;
    status: BookingStatus;
    guest: {
      __typename: "Guest";
      id: string;
      profilePicture: string;
      name: string;
    };
  };
}

export function Booking({ booking }: BookingProps) {
  return (
    <Card>
      <Wrap align="center" spacing="4">
        <Image
          isAvatar
          src={booking.guest.profilePicture}
          w="100px"
          h="auto"
          alt={booking.guest.name}
        />
        <Content
          title={booking.guest.name}
          checkInDate={booking.checkInDate}
          checkOutDate={booking.checkOutDate}
        >
          {booking.status === "CURRENT" ? (
            <Box w="max-content">
              <Text fontWeight="semibold" fontStyle="italic">
                Current guest
              </Text>
            </Box>
          ) : null}
        </Content>
      </Wrap>
    </Card>
  );
}
