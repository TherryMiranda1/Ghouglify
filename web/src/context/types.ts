import { TagTypeBase } from "../components/widgets/TagsManager/TagsManager";
import { Post } from "../types/Post";
import { User } from "../types/User";

export interface OriginalImageType {
  title: string;
  content: any;
}

export interface GlobalReturnType {
  image: UseImageOptions;
  user: UseUserOptions;
  posts: UsePostsOptions;
  sandbox: UseSandboxOptions;
}

export interface UseImageOptions {
  imageData: any;
  transformedImage: any;
  load: (image: string) => void;
  transform: (post: Post, prompt: string) => void;
}

export interface UseSandboxOptions {
  originalImage: Post | null;
  setOriginalImage: (image: Post | null) => void;
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  imageSource: TagTypeBase;
  setImageSource: (source: TagTypeBase) => void;
}

export interface UsePostsOptions {
  userPosts: {
    userPostsData: Post[] | null;
    isLoadingUserPosts: boolean;
    getUserPosts: () => void;
    isUserPostsError: boolean;
  };
  publicPosts: {
    publicPostsData: Post[] | null;
    isLoadingPublicPosts: boolean;
    getPublicPosts: () => void;
    isPublicPostsError: boolean;
  };
  currentToggledPost: Post | null;
  currentUserPostsFilter: TagTypeBase;
  setCurrentToggledPost: (post: Post | null) => void;
  setCurrentUserPostsFilter: (filter: TagTypeBase) => void;
  handleDeletePost: (post: Post) => void;
  handleCreatePost: (post: Post) => Promise<Post | null> | void;
  handleUpdatePost: (post: Post) => Promise<Post | null> | void;
}

export interface UseUserOptions {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}
