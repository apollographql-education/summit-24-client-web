import { Box, Text, Wrap } from "@chakra-ui/react";
import { Content, Image, InnerContainer, OuterContainer } from "./Card";

import { gql } from "@apollo/client";
import { fragments } from "../apollo/fragments";
import { Booking_bookingFragment } from "./__generated__/Booking.types";

interface BookingProps {
  booking: Booking_bookingFragment;
  isPast?: boolean;
}

fragments.register(gql`
  fragment Booking_booking on Booking {
    id
    checkInDate
    checkOutDate
    status
    guest {
      id
      profilePicture
      name
    }
  }
`);

export function Booking({ booking }: BookingProps) {
  return (
    <OuterContainer p={2}>
      <InnerContainer>
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
      </InnerContainer>
    </OuterContainer>
  );
}
