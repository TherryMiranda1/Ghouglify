import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"a"> & {
  text: string;
  onClick?: () => void;
  href?: string;
};

export const Link = ({ text, onClick, ...props }: Props) => {
  return (
    <LinkStyled
      onClick={() => onClick?.()}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {text}
    </LinkStyled>
  );
};

const LinkStyled = styled.a``;
