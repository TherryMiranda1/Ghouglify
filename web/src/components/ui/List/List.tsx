import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"ol"> & {
  children?: React.ReactNode;
};

export const List = ({ children, ...props }: Props) => {
  return <ListStyled {...props}>{children}</ListStyled>;
};

const ListStyled = styled.ol``;
