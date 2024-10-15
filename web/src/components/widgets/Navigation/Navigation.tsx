import styled from "styled-components";
import { LeftMenu } from "./components/LeftMenu";
import { BottomToolbar } from "./components/BottomToolbar";

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
`;

const AppContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-left: ${LEFT_MENU_WIDTH};
`;
