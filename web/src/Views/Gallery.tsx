import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { Post } from "../types/Post";
import { TagsManager } from "../components/widgets/TagsManager/TagsManager";
import { USER_POSTS_FILTERS, UserPostsFilter } from "../context/hooks/usePosts";

interface Props {
  onSelect?: (item: Post) => void;
  showTags?: boolean;
  showTransFormationsInitialValue?: boolean;
}

export const Gallery = ({ onSelect, showTags }: Props) => {
  const {
    user: { currentUser },
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
    return <View>Error</View>;
  }

  const filterUserPosts = (posts: Post[], filter: UserPostsFilter) => {
    switch (filter) {
      case UserPostsFilter.LOADING:
        return posts?.filter((post) => post.isLoading);
      case UserPostsFilter.TRANSFORMATIONS:
        return posts?.filter((post) => post.transformedImageUrl);
      case UserPostsFilter.PUBLIC:
        return posts?.filter((post) => post.isPublic);
      default:
        return posts;
    }
  };

  if (userPostsData?.length === 0) {
    return <View>No hay publicaciones</View>;
  }

  return (
    <>
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
            posts={filterUserPosts(
              userPostsData,
              currentUserPostsFilter.id as UserPostsFilter
            )}
            onSelect={onSelect}
            showTransformationInitialValue={showTransFormationsInitialValue}
          />
        </>
      )}
    </>
  );
};
