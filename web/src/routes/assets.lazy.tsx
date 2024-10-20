import { createLazyFileRoute } from "@tanstack/react-router";
import { View } from "../components";
import { AssetsManager } from "../components/widgets/AssetsManager/AssetsManager";

export const Route = createLazyFileRoute("/assets")({
  component: () => (
    <View>
      <AssetsManager />
    </View>
  ),
});
