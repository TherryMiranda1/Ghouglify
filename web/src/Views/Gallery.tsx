import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";
import { Post } from "../types/Post";

interface Props {
  onSelect?: (item: Post) => void;
}

export const Gallery = ({ onSelect }: Props) => {
  const {
    user: { currentUser },
    posts: {
      userPosts: {
        userPostsData,
        getUserPosts,
        isLoadingUserPosts,
        isUserPostsError,
      },
    },
  } = useGlobalContext();

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

  return (
    <>
      {userPostsData && (
        <ImagesGallery posts={userPostsData} onSelect={onSelect} />
      )}
    </>
  );
};
