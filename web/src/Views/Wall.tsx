import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { Post } from "../types/Post";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";

interface Props {
  onSelect?: (item: Post) => void;
}

export const Wall = ({ onSelect }: Props) => {
  const {
    posts: {
      publicPosts: {
        publicPostsData,
        getPublicPosts,
        isLoadingPublicPosts,
        isPublicPostsError,
      },
    },
  } = useGlobalContext();

  useEffect(() => {
    if (!publicPostsData) {
      getPublicPosts();
    }
  }, [publicPostsData]);

  if (isLoadingPublicPosts) {
    return <LoadingState />;
  }

  if (isPublicPostsError) {
    return <View>Error</View>;
  }

  return (
    <>
      {publicPostsData && (
        <ImagesGallery posts={publicPostsData} onSelect={onSelect} />
      )}
    </>
  );
};
