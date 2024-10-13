import { useState } from "react";
import { Post } from "../../types/Post";
import { UsePostsOptions } from "../types";
import {
  createPostRequest,
  deletePostRequest,
  getPostsByUserIdRequest,
} from "../../infra/api/posts";
import { useAsyncCall } from "../../hooks/useAsyncCall";
import { User } from "../../types/User";

interface Props {
  currentUser: User | null;
}
export const usePosts = ({ currentUser }: Props): UsePostsOptions => {
  const [currentToggledPost, setCurrentToggledPost] = useState<Post | null>(
    null
  );

  const {
    isError: isUserPostsError,
    isLoading: isLoadingUserPosts,
    data: userPostsData,
    call: getUserPosts,
  } = useAsyncCall(getPostsByUserIdRequest);

  const handleDeletePost = async (post: Post) => {
    const result = await deletePostRequest({ post });
    if (result) {
      handleGetUserPosts();
    }
  };
  const handleCreatePost = async (post: Post) => {
    const result = await createPostRequest({ post });
    if (result) {
      handleGetUserPosts();
    }
  };

  const handleGetUserPosts = async () => {
    getUserPosts({ userId: currentUser?.userUUID });
  };

  return {
    userPosts: {
      userPostsData,
      isLoadingUserPosts,
      getUserPosts: handleGetUserPosts,
      isUserPostsError,
    },
    currentToggledPost,
    setCurrentToggledPost,
    handleDeletePost,
    handleCreatePost,
  };
};
