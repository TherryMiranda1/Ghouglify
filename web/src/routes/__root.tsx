import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Navigation } from "../components/widgets/Navigation/Navigation";
import { TopBar } from "../components/widgets/Navigation/components/TopBar";
import { Toaster } from "react-hot-toast";

export const Route = createRootRoute({
  component: () => (
    <>
      <TopBar />
      <Navigation>
        <Outlet />
        <Toaster />
      </Navigation>
    </>
  ),
});
