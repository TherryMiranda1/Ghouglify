import { createLazyFileRoute } from "@tanstack/react-router";
import { PostView } from "../../Views/Post";
import { View } from "../../components";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: () => (
    <View>
      <PostView />
    </View>
  ),
});
