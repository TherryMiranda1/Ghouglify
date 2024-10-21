import { ComponentProps } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

type Props = ComponentProps<"section"> & {
  children?: React.ReactNode;
};

export const Section = ({ children, ...props }: Props) => {
  return <SectionStyled {...props}>{children}</SectionStyled>;
};

const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 16px;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
    padding: 0px 8px;
  }
`;
