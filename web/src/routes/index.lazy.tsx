import { createLazyFileRoute } from "@tanstack/react-router";
import { View } from "../components";
import { Home } from "../Views/Home";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <View>
      <Home />
    </View>
  ),
});
