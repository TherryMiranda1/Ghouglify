import { createLazyFileRoute } from "@tanstack/react-router";
import { View } from "../components";
import { Create } from "../Views/Create";

export const Route = createLazyFileRoute("/create")({
  component: () => (
    <View>
      <Create />
    </View>
  ),
});
