import { useEffect } from "react";
import { EmptyState, LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { Post } from "../types/Post";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { GalleryContainer } from "../styles/Common.styles";
import { sortByDate } from "../utils/sortByDate";
import { useRouter } from "@tanstack/react-router";
import { IMAGES } from "../assets/images";

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
    return (
      <View>
        <EmptyState
          title="Algo ha salido mal"
          description="Parece que la suerte no esta de nuestro lado..."
          image={IMAGES.cat}
          buttonText="Reintentar"
          buttonOnClick={() => getPublicPosts()}
        />
      </View>
    );
  }

  if (publicPostsData?.length === 0) {
    return (
      <View>
        <EmptyState
          title="Esto esta muy vacio"
          image={IMAGES.empty}
          description="Comienza a crear imagenes espeluznantes"
          buttonText="Subir imagen"
          buttonOnClick={() => navigate({ to: "/create" })}
        />
      </View>
    );
  }
  console.log(
    publicPostsData?.filter((post) =>
      post.transformedImageUrl?.includes("data:image")
    )
  );

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
