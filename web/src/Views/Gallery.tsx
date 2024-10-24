import { useEffect } from "react";
import { EmptyState, LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { Post } from "../types/Post";
import { TagsManager } from "../components/widgets/TagsManager/TagsManager";
import { USER_POSTS_FILTERS, UserPostsFilter } from "../context/hooks/usePosts";
import { GalleryContainer } from "../styles/Common.styles";
import { filterUserPosts } from "../utils/filterUserPosts";
import { sortByDate } from "../utils/sortByDate";
import { IMAGES } from "../assets/images";
import { useRouter } from "@tanstack/react-router";
import { IMAGE_SOURCES } from "../context/GlobalContext.constants";

interface Props {
  onSelect?: (item: Post) => void;
  showTags?: boolean;
  showTransFormationsInitialValue?: boolean;
}

export const Gallery = ({ onSelect, showTags }: Props) => {
  const { navigate } = useRouter();
  const {
    user: { currentUser },
    sandbox: { setImageSource },
    posts: {
      userPosts: {
        userPostsData,
        getUserPosts,
        isLoadingUserPosts,
        isUserPostsError,
      },
      currentUserPostsFilter,
      setCurrentUserPostsFilter,
    },
  } = useGlobalContext();

  const showTransFormationsInitialValue =
    currentUserPostsFilter.id === UserPostsFilter.TRANSFORMATIONS;

  useEffect(() => {
    if (!userPostsData && currentUser) {
      getUserPosts();
    }
  }, [userPostsData]);

  if (isLoadingUserPosts) {
    return <LoadingState />;
  }

  if (isUserPostsError) {
    return (
      <View>
        <EmptyState
          title="Algo ha salido mal"
          description="Parece que la suerte no esta de nuestro lado..."
          image={IMAGES.cat}
          buttonText="Reintentar"
          buttonOnClick={() => getUserPosts()}
        />
      </View>
    );
  }

  if (userPostsData?.length === 0) {
    return (
      <View>
        <EmptyState
          title="Esto esta muy vacio"
          image={IMAGES.empty}
          buttonText="Subir imagen"
          description="Comienza a crear imagenes espeluznantes"
          buttonOnClick={() => {
            setImageSource(IMAGE_SOURCES[0]);
            navigate({ to: "/create" });
          }}
        />
      </View>
    );
  }

  return (
    <GalleryContainer>
      {userPostsData && (
        <>
          {showTags && (
            <TagsManager
              data={USER_POSTS_FILTERS}
              currentTag={currentUserPostsFilter}
              onSelect={setCurrentUserPostsFilter}
            />
          )}
          <ImagesGallery
            posts={sortByDate(
              filterUserPosts(
                userPostsData,
                currentUserPostsFilter.id as UserPostsFilter
              )
            )}
            onSelect={(post) => {
              if (onSelect) {
                onSelect(post);
              } else {
                navigate({ to: `/posts/${post._id}` });
              }
            }}
            showTransformationInitialValue={showTransFormationsInitialValue}
          />
        </>
      )}
    </GalleryContainer>
  );
};
