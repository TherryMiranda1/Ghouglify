import { Link } from "@tanstack/react-router";
import { Header, Navbar } from "../../../ui";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import styled from "styled-components";
import { OverlaySwitcher } from "../../OverlaySwitcher/OverlaySwitcher";

export const TopBar = () => {
  const {
    user: { currentUser },
  } = useGlobalContext();
  return (
    <Navbar>
      <Link to="/">
        <header className="header">
          <OverlaySwitcher image1="/logo.png" image2="/pumpkin-squared.png" />
          <Header text="Ghouglify" />
        </header>
      </Link>
      {currentUser && (
        <CurrentUserStyled to={"/me"}>
          <Header componentType="h4" text={`Hola ${currentUser.name}`} />
          {currentUser.profileImage && (
            <img src={currentUser.profileImage} alt="profile" />
          )}
        </CurrentUserStyled>
      )}
    </Navbar>
  );
};

const CurrentUserStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: var(--border);
  }
`;
