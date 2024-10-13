import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header, Navbar } from "../components";

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar>
        <Link to="/">
          <Header text="Ghouglify" />
        </Link>
        <div>
          <Link to="/gallery"> Gallery</Link>
        </div>
      </Navbar>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
