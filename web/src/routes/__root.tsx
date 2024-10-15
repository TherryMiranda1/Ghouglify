import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { Header, Navbar } from "../components";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar>
        <Link to="/">
          <header className="header">
            <img src="/logo.png" alt="logo" />
            <Header text="Ghouglify" />
          </header>
        </Link>
        <div>
          <Link to="/gallery"> Gallery</Link>
        </div>
      </Navbar>
      <Outlet />
    </>
  ),
});
