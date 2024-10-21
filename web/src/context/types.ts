import { TagTypeBase } from "../components/widgets/TagsManager/TagsManager";
import { Asset } from "../types/Asset";
import { CloudinaryImageDTO } from "../types/DTOs";
import { Post } from "../types/Post";
import { User } from "../types/User";
import { AssetDraft } from "./hooks/useAssets";

export interface OriginalImageType {
  title: string;
  content: any;
}

export enum ImageSource {
  LOCAL = "local",
  CLOUD = "cloud",
  CAMERA = "camera",
}

export enum TransformationOptions {
  BACKGROUND_REPLACE = "background_replace",
  BACKGROUND_GENERATION = "background_generation",
  FACE_SWAPING = "face_swapping",
}

export enum AssetFilter {
  BACKGROUND = "background",
  CHARACTER_MALE = "character_male",
  CHARACTER_FEMALE = "character_female",
}

export interface GlobalReturnType {
  image: UseImageOptions;
  user: UseUserOptions;
  posts: UsePostsOptions;
  sandbox: UseSandboxOptions;
  assets: UseAssetsOptions;
}

export interface UseImageOptions {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  transformedImage: any;
  setTransformedImage: (image: any) => void;
  mergedImage: string;
  setMergedImage: (image: string) => void;
  load: (image: string) => Promise<CloudinaryImageDTO>;
  transform: (post: Post, prompt: string) => void;
  swapFace: ({ source, target }: { source: string; target: string }) => void;
  removeBackground: ({ url }: { url: string }) => void;
}

export interface UseSandboxOptions {
  originalImage: Post | null;
  setOriginalImage: (image: Post | null) => void;
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  imageSource: TagTypeBase;
  setImageSource: (source: TagTypeBase) => void;
  currentTransformationOption: TagTypeBase;
  setCurrentTransformationOption: (option: TagTypeBase) => void;
  faceSwapTargetAsset: Asset | null;
  setFaceSwapTargetAsset: (asset: Asset | null) => void;
  currentAssetFilter: TagTypeBase;
  setCurrentAssetFilter: (filter: TagTypeBase) => void;
  backgroundReplaceAsset: Asset | null;
  setBackgroundReplaceAsset: (asset: Asset | null) => void;
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

export interface UseAssetsOptions {
  assets: {
    assetsData: Asset[] | null;
    getAssets: () => void;
    isAssetsLoading: boolean;
    isAssetsError: boolean;
  };
  currentAssetFilter: TagTypeBase;
  setCurrentAssetFilter: (filter: TagTypeBase) => void;
  handleDeleteAsset: (asset: Asset) => void;
  handleCreateAsset: (
    asset: AssetDraft
  ) => Promise<Asset | undefined | null> | void;
  handleUpdateAsset: (asset: Asset) => Promise<Asset | null> | void;
}
