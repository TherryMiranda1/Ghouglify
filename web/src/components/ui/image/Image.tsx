import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"img"> & {
  $aspectRatio?: number;
  $width?: number;
  $height?: number;
};

export const Image = ({ ...props }: Props) => {
  return <ImageStyled className="media" {...props} />;
};

const ImageStyled = styled.img<Props>`
  object-fit: cover;
  object-position: top;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "")};
  aspect-ratio: ${(props) => props.$aspectRatio};
`;
