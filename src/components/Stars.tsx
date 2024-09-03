import { HStack } from "@chakra-ui/react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

interface StarsProps {
  rating?: number;
  size?: number;
}

export default function Stars({ rating = 0, size = 16 }: StarsProps) {
  const getStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(<IoStar key={i} size={size} />);
    }
    if (rating % 1 !== 0) {
      stars.push(<IoStarHalf key="half-star" size={size} />);
    }
    for (let i = 0; i < 5 - Math.ceil(rating); i++) {
      stars.push(<IoStarOutline key={`empty-${i}`} size={size} />);
    }
    return stars;
  };

  return <HStack spacing="1">{getStars(rating)}</HStack>;
}
