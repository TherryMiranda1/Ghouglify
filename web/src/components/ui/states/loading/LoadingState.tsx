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
}
export const LoadingState = ({
  width = 220,
  height = 200,
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
    <LoadingStateStyled $transparent={transparent}>
      <WrapperStyled $width={width} $height={height}>
        <Lottie {...options} />
      </WrapperStyled>
    </LoadingStateStyled>
  );
};

const LoadingStateStyled = styled.section<{ $transparent?: boolean }>`
  background-color: ${({ $transparent }) =>
    $transparent ? "transparent" : ""};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 0px;
`;

const WrapperStyled = styled.div<{ $width: number; $height: number }>`
  width: ${(props) => props.$width}px;
  height: ${(props) => props.$height}px;
`;
