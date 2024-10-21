import { UserPostsFilter } from "../context/hooks/usePosts";
import { Post } from "../types/Post";

export const filterUserPosts = (posts: Post[], filter: UserPostsFilter) => {
  switch (filter) {
    case UserPostsFilter.LOADING:
      return posts?.filter((post) => post.isLoading);
    case UserPostsFilter.TRANSFORMATIONS:
      return posts?.filter((post) => post.transformedImageUrl);
    case UserPostsFilter.PUBLIC:
      return posts?.filter((post) => post.isPublic);
    default:
      return posts?.filter((post) => !post.isTransformation);
  }
};
