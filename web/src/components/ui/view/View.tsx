import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"main"> & {
  children?: React.ReactNode;
};

export const View = ({ children, ...props }: Props) => {
  return (
    <ViewStyled className="view" {...props}>
      {children}
    </ViewStyled>
  );
};

const ViewStyled = styled.main`
  padding: 32px;
  min-height: 100vh;
  min-width: 320px;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  box-sizing: border-box;
`;
