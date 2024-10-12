import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"button"> & {
  text?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ text, onClick, children, ...props }: Props) => {
  return (
    <ButtonStyled {...props} onClick={() => onClick?.()}>
      {text}
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
`;
