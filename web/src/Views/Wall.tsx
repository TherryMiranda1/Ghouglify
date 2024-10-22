import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { Post } from "../types/Post";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { GalleryContainer } from "../styles/Common.styles";
import { sortByDate } from "../utils/sortByDate";
import { useRouter } from "@tanstack/react-router";

interface Props {
  onSelect?: (item: Post) => void;
}

export const Wall = ({ onSelect }: Props) => {
  const { navigate } = useRouter();
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
  console.log(publicPostsData?.filter(post => post.transformedImageUrl?.includes('data:image')));

  return (
    <GalleryContainer>
      {publicPostsData && (
        <ImagesGallery
          posts={sortByDate(publicPostsData)}
          onSelect={(post) => {
            onSelect?.(post);
            navigate({ to: `/posts/${post._id}` });
          }}
          showTransformationInitialValue
        />
      )}
    </GalleryContainer>
  );
};
