import { createLazyFileRoute } from "@tanstack/react-router";
import MarkdownRenderer from "../components/widgets/MarkdownRenderer/MarkdownRenderer";
import { View } from "../components";

export const Route = createLazyFileRoute("/about")({
  component: () => (
    <View>
      <MarkdownRenderer path="/about.md" />
    </View>
  ),
});
