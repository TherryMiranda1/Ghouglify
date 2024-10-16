import { Link } from "@tanstack/react-router";
import { Header, Navbar } from "../../../ui";
import { useGlobalContext } from "../../../../context/useGlobalContext";

export const TopBar = () => {
  const {
    user: { currentUser },
  } = useGlobalContext();
  return (
    <Navbar>
      <Link to="/">
        <header className="header">
          <img src="/logo.png" alt="logo" />
          <Header text="Ghouglify" />
        </header>
      </Link>
      {currentUser && (
        <Header componentType="h4" text={`Hola ${currentUser.name}`} />
      )}
    </Navbar>
  );
};
