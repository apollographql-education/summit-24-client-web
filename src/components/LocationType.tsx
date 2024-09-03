import {
  IoBonfireOutline,
  IoBusinessOutline,
  IoCubeOutline,
  IoHomeOutline,
  IoRocketOutline,
} from "react-icons/io5";

type LocType = "SPACESHIP" | "HOUSE" | "CAMPSITE" | "APARTMENT" | "ROOM";

interface LocationTypeProps {
  locType?: LocType;
  size?: string;
}

export default function LocationType({ locType, size }: LocationTypeProps) {
  const Icon = ({
    locType,
    size = "1em",
  }: {
    locType?: LocType;
    size?: string;
  }) => {
    switch (locType) {
      case "SPACESHIP":
        return <IoRocketOutline size={size} />;
      case "HOUSE":
        return <IoHomeOutline size={size} />;
      case "CAMPSITE":
        return <IoBonfireOutline size={size} />;
      case "APARTMENT":
        return <IoBusinessOutline size={size} />;
      case "ROOM":
        return <IoCubeOutline size={size} />;
      default:
        return null;
    }
  };

  return <Icon locType={locType} size={size} />;
}
