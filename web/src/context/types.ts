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
  download: () => void;
  transform: (imageId: string, prompt: string) => void;
}

export interface UseSandboxOptions {
  originalImage: OriginalImageType | null;
  setOriginalImage: (image: OriginalImageType | null) => void;
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  imageSource: { id: string; title: string };
  setImageSource: (source: { id: string; title: string }) => void;
}

export interface UsePostsOptions {
  userPosts: {
    userPostsData: Post[] | null;
    isLoadingUserPosts: boolean;
    getUserPosts: () => void;
    isUserPostsError: boolean;
  };
  currentToggledPost: Post | null;
  setCurrentToggledPost: (post: Post | null) => void;
  handleDeletePost: (post: Post) => void;
  handleCreatePost: (post: Post) => void;
}

export interface UseUserOptions {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}
