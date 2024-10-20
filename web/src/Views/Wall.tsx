import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { Post } from "../types/Post";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { GalleryContainer } from "../styles/Common.styles";

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

  if (publicPostsData?.length === 0) {
    return <View>No hay publicaciones</View>;
  }

  return (
    <GalleryContainer>
      {publicPostsData && (
        <ImagesGallery
          posts={publicPostsData}
          onSelect={onSelect}
          showTransformationInitialValue
        />
      )}
    </GalleryContainer>
  );
};
