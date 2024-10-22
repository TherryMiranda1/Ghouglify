import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

interface ImageOverlaySwitcherProps {
  image1: string;
  image2: string;
}

const ImageOverlayContainer = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  overflow: hidden;
`;

const ImageOverlay = styled.img<{
  isVisible: boolean;
  $width?: number;
  $height?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $width }) => ($width ? $width : 40)}px;
  height: ${({ $height }) => ($height ? $height : 40)}px;
  object-fit: cover;
  transition: opacity 1 ease-in-out;
  opacity: 0;
  z-index: 1;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
      z-index: 2;
    `}
`;

export const OverlaySwitcher: React.FC<ImageOverlaySwitcherProps> = ({
  image1,
  image2,
}) => {
  const [showFirstImage, setShowFirstImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirstImage((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageOverlayContainer>
      <ImageOverlay src={image1} alt="Image 1" isVisible={showFirstImage} />
      <ImageOverlay
        src={image2}
        alt="Image 2"
        isVisible={!showFirstImage}
        width={50}
        height={50}
      />
    </ImageOverlayContainer>
  );
};
