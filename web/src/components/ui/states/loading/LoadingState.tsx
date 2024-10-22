import styled from "styled-components";
import Lottie from "lottie-react";

import animationData from "../../../../assets/lottie/Lottie-loading.json";

const options = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

interface Props {
  width?: number;
  height?: number;
  transparent?: boolean;
  onlyText?: boolean;
  isButtonLoader?: boolean;
}
export const LoadingState = ({
  width = 160,
  height = 150,
  isButtonLoader = false,
  transparent = false,
  onlyText = false,
}: Props) => {
  if (onlyText)
    return (
      <LoadingStateStyled $transparent={transparent}>
        Loading..
      </LoadingStateStyled>
    );
  return (
    <LoadingStateStyled
      $isButtonLoader={isButtonLoader}
      $transparent={transparent}
    >
      <WrapperStyled $width={width} $height={height}>
        <Lottie {...options} />
      </WrapperStyled>
    </LoadingStateStyled>
  );
};

const LoadingStateStyled = styled.section<{
  $isButtonLoader?: boolean;
  $transparent?: boolean;
}>`
  background-color: ${({ $transparent }) =>
    $transparent ? "transparent" : ""};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $isButtonLoader }) => ($isButtonLoader ? "0px" : "16px 8px")};
`;

const WrapperStyled = styled.div<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;
