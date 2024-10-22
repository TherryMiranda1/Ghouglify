import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"img"> & {
  $aspectRatio?: number;
  $width?: number;
  $height?: number;
  $hideBorder?: boolean;
};

export const Image = ({ ...props }: Props) => {
  return <ImageStyled className="media" {...props} />;
};

const ImageStyled = styled.img<Props>`
  object-fit: cover;
  object-position: top;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  height: ${({ $height }) => ($height ? `${$height}px` : "")};
  border: ${({ $hideBorder }) => ($hideBorder ? "none" : "var(--border)")};
  aspect-ratio: ${(props) => props.$aspectRatio};
`;
