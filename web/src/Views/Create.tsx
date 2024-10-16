import { useEffect } from "react";
import { ImageDownloader } from "../components";
import { Card, Section, Image } from "../components/ui";
import { Sandbox } from "../components/widgets/Sandbox/Sandbox";
import { useGlobalContext } from "../context/useGlobalContext";
import { USER_POSTS_FILTERS } from "../context/hooks/usePosts";

export const Create = () => {
  const {
    image: { transformedImage },
    posts: { setCurrentUserPostsFilter },
  } = useGlobalContext();

  useEffect(() => {
    setCurrentUserPostsFilter(USER_POSTS_FILTERS[0]);
  }, []);

  return (
    <Section>
      <Sandbox />
      {transformedImage && (
        <Card>
          <Image src={transformedImage} />
          <ImageDownloader imageUrl={transformedImage} />
        </Card>
      )}
    </Section>
  );
};
