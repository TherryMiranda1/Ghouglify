import { ComponentProps } from "react";
import { HeaderComponentType } from "../../../types/Text";

type Props = ComponentProps<"h1"> & {
  text: string;
  componentType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Header = ({
  text,
  componentType = HeaderComponentType.H1,
  ...props
}: Props) => {
  switch (componentType) {
    case HeaderComponentType.H1:
      return <h1 {...props}>{text}</h1>;
    case HeaderComponentType.H2:
      return <h2 {...props}>{text}</h2>;
    case HeaderComponentType.H3:
      return <h3 {...props}>{text}</h3>;
    case HeaderComponentType.H4:
      return <h4 {...props}>{text}</h4>;
    case HeaderComponentType.H5:
      return <h5 {...props}>{text}</h5>;
    case HeaderComponentType.H6:
      return <h6 {...props}>{text}</h6>;
  }
};
