declare module "react-rating-stars-component" {
  import { ReactElement } from "react";

  interface ReactStarsProps {
    classNames?: string;
    edit?: boolean;
    half?: boolean;
    value?: number;
    count?: number;
    char?: string;
    size?: number;
    color?: string;
    activeColor?: string;
    emptyIcon?: ReactElement;
    halfIcon?: ReactElement;
    filledIcon?: ReactElement;
    a11y?: boolean;
    isHalf?: boolean;
    onChange?: (rating: number) => void;
  }

  function ReactStars(props: ReactStarsProps): JSX.Element;

  export default ReactStars;
}
