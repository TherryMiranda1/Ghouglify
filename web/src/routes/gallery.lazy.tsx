import { createLazyFileRoute } from "@tanstack/react-router";
import { Gallery } from "../Views/Gallery";
import { Header, View } from "../components";

export const Route = createLazyFileRoute("/gallery")({
  component: () => (
    <View>
      <Header componentType="h3" text="Mis imagenes" />
      <Gallery showTags />
    </View>
  ),
});
