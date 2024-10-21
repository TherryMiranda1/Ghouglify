import { useEffect } from "react";
import { Section } from "../components/ui";
import { Sandbox } from "../components/widgets/Sandbox/Sandbox";
import { useGlobalContext } from "../context/useGlobalContext";
import { USER_POSTS_FILTERS } from "../context/hooks/usePosts";

export const Create = () => {
  const {
    posts: { setCurrentUserPostsFilter },
  } = useGlobalContext();

  useEffect(() => {
    setCurrentUserPostsFilter(USER_POSTS_FILTERS[0]);
  }, []);

  return (
    <Section>
      <Sandbox />
    </Section>
  );
};
