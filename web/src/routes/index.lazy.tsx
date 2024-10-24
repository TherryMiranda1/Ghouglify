import { createLazyFileRoute } from "@tanstack/react-router";
import { View } from "../components";
import { Wall } from "../Views/Wall";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <View>
      <Wall />
    </View>
  ),
});
