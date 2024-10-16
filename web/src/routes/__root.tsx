import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navigation } from "../components/widgets/Navigation/Navigation";
import { TopBar } from "../components/widgets/Navigation/components/TopBar";

export const Route = createRootRoute({
  component: () => (
    <>
      <TopBar />
      <Navigation>
        <Outlet />
      </Navigation>
    </>
  ),
});
