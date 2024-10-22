import styled from "styled-components";
import { IMAGES } from "../../../assets/images";

interface Props {
  $width?: number;
  $height?: number;
}

export const BlackCat = ({ ...props }: Props) => {
  return <ImageStyled {...props} src={IMAGES.cat} />;
};

const ImageStyled = styled.img<Props>`
  position: absolute;
  z-index: 20;
  object-fit: cover;
  object-position: center;
  bottom: -40px;
  right: -15px;
  width: ${({ $width }) => ($width ? `${$width}px` : "100px")};
  height: ${({ $height }) => ($height ? `${$height}px` : "100px")};
`;
