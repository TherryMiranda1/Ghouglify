import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"nav"> & {
  children?: React.ReactNode;
  height?: number;
  isFixed?: boolean;
};

export const Navbar = ({
  children,
  height = 60,
  isFixed = true,
  ...props
}: Props) => {
  return (
    <>
      <NavbarStyled className="navbar" $height={height} $isFixed={isFixed} {...props}>
        {children}
      </NavbarStyled>
      {isFixed && (
        <SpacingStyled $height={height} $isFixed={isFixed}></SpacingStyled>
      )}
    </>
  );
};

const NavbarStyled = styled.nav<{ $height: number; $isFixed: boolean }>`
  height: ${({ $height }) => $height}px;
  position: ${({ $isFixed }) => ($isFixed ? "fixed" : "relative")};
  display: flex;
  gap: 16px;
  padding: 16px;
  top: 0;
  width: 100%;
  z-index: 100;
  box-sizing: border-box;
`;
const SpacingStyled = styled.div<{ $height: number; $isFixed: boolean }>`
  height: ${({ $height }) => $height}px;
  position: relative;
`;
