import styled from "styled-components";
import { NAVIGATION_OPTIONS } from "../navigation.constants";
import { Link, useLocation } from "@tanstack/react-router";
import { DEVICE_BREAKPOINTS } from "../../../../constants/devices";

export const BottomToolbar = () => {
  const { pathname } = useLocation();
  const getIsActive = (path: string) => pathname === path;

  return (
    <BottomToolbarStyled>
      {NAVIGATION_OPTIONS.map((item) => (
        <ToolbarItemStyled
          key={item.title}
          $isActive={getIsActive(item.path)}
          $isMain={item.isMainOption}
        >
          {item.isMainOption ? (
            <MainOptionStyled to={item.path}>
              {item.icon}
              {item.title}
            </MainOptionStyled>
          ) : (
            <Link to={item.path}>
              {item.icon}
              {item.title}
            </Link>
          )}
        </ToolbarItemStyled>
      ))}
    </BottomToolbarStyled>
  );
};

const BottomToolbarStyled = styled.nav`
  box-sizing: border-box;
  background-color: var(--background-transparent-color);
  backdrop-filter: blur(10px);
  position: fixed;
  z-index: 10;
  bottom: 0px;
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-around;
  padding: 8px;

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.md}) {
    display: none;
  }
`;

const ToolbarItemStyled = styled.div<{
  $isMain?: boolean;
  $isActive?: boolean;
}>`
  padding: 4px;
  width: ${({ $isMain }) => ($isMain ? "65px" : "40px")};

  border-radius: var(--tag-radius);
  font-size: 14px;
  color: ${({ $isActive }) =>
    $isActive ? "var(--tint-color)" : "var(--text-color)"};
  transition: all 0.3s ease-in-out;

  svg {
    font-size: 24px;
  }
  a {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
  }
`;

const MainOptionStyled = styled(Link)`
  position: absolute;
  background-color: var(--tint-color);
  color: var(--text-color);
  border-radius: var(--tag-radius);
  padding: 10px 8px 6px 8px;
  padding-top: 8;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  top: -10px;
  svg {
    font-size: 24px;
  }
`;
