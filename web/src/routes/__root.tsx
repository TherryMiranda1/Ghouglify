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
        <Toaster
          toastOptions={{
            duration: 5000,
            style: {
              marginTop: "64px",
              backgroundColor: "var(--background-color)",
              color: "var(--text-color)",
              border: "var(--border)",
            },
          }}
        />
      </Navigation>
    </>
  ),
});
