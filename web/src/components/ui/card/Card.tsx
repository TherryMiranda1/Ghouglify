import { ComponentProps } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

type Props = ComponentProps<"article"> & {
  children: React.ReactNode;
};

export const Card = ({ children, ...props }: Props) => {
  return (
    <CardStyled className="card" {...props}>
      {children}
    </CardStyled>
  );
};

const CardStyled = styled.article`
  display: flex;
  flex-direction: column;
  max-width: ${DEVICE_BREAKPOINTS.sm};
  padding: 16px;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
`;
