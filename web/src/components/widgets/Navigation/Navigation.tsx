import styled from "styled-components";
import { LeftMenu } from "./components/LeftMenu";
import { BottomToolbar } from "./components/BottomToolbar";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

interface Props {
  children?: React.ReactNode;
}
const LEFT_MENU_WIDTH = "260px";

export const Navigation = ({ children }: Props) => {
  return (
    <NavigationStyled>
      <LeftMenu $width={LEFT_MENU_WIDTH} />
      <AppContainer>{children}</AppContainer>
      <BottomToolbar />
    </NavigationStyled>
  );
};

const NavigationStyled = styled.main`
  display: flex;
  box-sizing: border-box;
`;

const AppContainer = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    padding-bottom: 72px;
  }

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.md}) {
    padding-left: ${LEFT_MENU_WIDTH};
  }
`;
