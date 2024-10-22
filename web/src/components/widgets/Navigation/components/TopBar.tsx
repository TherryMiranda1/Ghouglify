import { Link } from "@tanstack/react-router";
import { Header, Navbar } from "../../../ui";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import styled from "styled-components";
import { OverlaySwitcher } from "../../OverlaySwitcher/OverlaySwitcher";
import { useState } from "react";

export const TopBar = () => {
  const {
    user: { currentUser },
  } = useGlobalContext();

  const [currentTheme, setCurrentTheme] = useState<string | null>(
    localStorage.getItem("data-theme") ?? "dark"
  );

  const setTheme = (theme: "light" | "dark") => {
    localStorage.setItem("data-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
  };

  return (
    <Navbar>
      <Link to="/">
        <header className="header">
          <OverlaySwitcher image1="/logo.png" image2="/pumpkin-squared.png" />
          <Header text="Ghouglify" />
        </header>
      </Link>
      {currentUser && (
        <CurrentUserStyled>
          <Link to={"/me"}>
            <Header
              className="truncate"
              componentType="h4"
              text={`${currentUser.name}`}
            />
            {currentUser.profileImage && (
              <img src={currentUser.profileImage} alt="profile" />
            )}
          </Link>
          <ThemeToggleStyled
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {currentTheme === "dark" ? "🌚" : "🌝"}
          </ThemeToggleStyled>
        </CurrentUserStyled>
      )}
    </Navbar>
  );
};

const CurrentUserStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: var(--border);
  }
`;
const ThemeToggleStyled = styled.button`
  font-size: 32px;
  padding: 0;
`;
