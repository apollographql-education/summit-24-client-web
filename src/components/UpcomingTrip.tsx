import { Wrap } from "@chakra-ui/react";
import { Content, Image } from "./Card";
import { Card } from "./Card/Card";
import { BookingStatus } from "../__generated__/types";
import { CurrentStayTag } from "./CurrentStayTag";

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
          {trip.status === "CURRENT" && <CurrentStayTag />}
        </Content>
      </Wrap>
    </Card>
  );
}
