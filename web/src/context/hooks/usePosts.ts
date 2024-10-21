import { useState } from "react";
import { Post } from "../../types/Post";
import { UsePostsOptions } from "../types";
import {
  createPostRequest,
  deletePostRequest,
  getPostsByUserIdRequest,
  getPostsRequest,
  updatePostRequest,
} from "../../infra/api/posts";
import { useAsyncCall } from "../../hooks/useAsyncCall";
import { User } from "../../types/User";
import { TagTypeBase } from "../../components/widgets/TagsManager/TagsManager";

interface Props {
  currentUser: User | null;
}

export enum UserPostsFilter {
  UPLOADED = "uploaded",
  LOADING = "loading",
  TRANSFORMATIONS = "transformations",
  PUBLIC = "public",
}

export const USER_POSTS_FILTERS = [
  {
    id: UserPostsFilter.UPLOADED,
    title: "Subidas",
  },
  {
    id: UserPostsFilter.TRANSFORMATIONS,
    title: "Transformaciones",
  },
  {
    id: UserPostsFilter.PUBLIC,
    title: "Publicas",
  },
];

export const usePosts = ({ currentUser }: Props): UsePostsOptions => {
  const [currentUserPostsFilter, setCurrentUserPostsFilter] =
    useState<TagTypeBase>(USER_POSTS_FILTERS[0]);
  const [currentToggledPost, setCurrentToggledPost] = useState<Post | null>(
    null
  );

  const {
    isError: isUserPostsError,
    isLoading: isLoadingUserPosts,
    data: userPostsData,
    call: getUserPosts,
  } = useAsyncCall(getPostsByUserIdRequest);

  const {
    isError: isPublicPostsError,
    isLoading: isPublicPostsLoading,
    data: publicPostsData,
    call: getPublicPosts,
  } = useAsyncCall(getPostsRequest);

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
    return result;
  };

  const handleUpdatePost = async (post: Post) => {
    const result = await updatePostRequest({ post });
    if (result) {
      handleGetUserPosts();
      getPublicPosts();
    }
    return result;
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
    publicPosts: {
      publicPostsData,
      isLoadingPublicPosts: isPublicPostsLoading,
      getPublicPosts,
      isPublicPostsError,
    },
    currentToggledPost,
    currentUserPostsFilter,
    setCurrentToggledPost,
    setCurrentUserPostsFilter,
    handleDeletePost,
    handleCreatePost,
    handleUpdatePost,
  };
};
