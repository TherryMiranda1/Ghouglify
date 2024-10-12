import { ComponentProps } from "react";
import styled from "styled-components";

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
  padding: 16px;
  gap: 16px;
`;
