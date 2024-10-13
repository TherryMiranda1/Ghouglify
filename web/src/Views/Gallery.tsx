import { useEffect } from "react";
import { View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { ImagesGallery } from "../components/widgets/ImagesGallery/ImagesGallery";

export const Gallery = () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPostsData]);

  if (isLoadingUserPosts) {
    return <View>Loading...</View>;
  }

  if (isUserPostsError) {
    return <View>Error</View>;
  }

  return (
    <>
     
      {userPostsData && <ImagesGallery posts={userPostsData} />}
    </>
  );
};
