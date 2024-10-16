import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"img">;

export const Image = ({ ...props }: Props) => {
  return <ImageStyled className="media" {...props} />;
};

const ImageStyled = styled.img`
  object-fit: cover;
  object-position: top;
  width: 100%;
`;
