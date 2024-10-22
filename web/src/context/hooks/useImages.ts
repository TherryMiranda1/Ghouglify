import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

import { UseImageOptions, UsePostsOptions, UseSandboxOptions } from "../types";
import { cloudinaryConfig } from "../../config/cloudinary";
import { loadImageRequest } from "../../infra/api/images";
import { User } from "../../types/User";
import { faceSwapToPost, imageToPost } from "../../infra/mappers/imageToPost";
import { Post } from "../../types/Post";
import {
  faceSwapRequest,
  removeBackgroundRequest,
} from "../../infra/api/services";
import { CloudinaryImageDTO } from "../../types/DTOs";
import { promptSanitizer } from "../../utils/promptSanitizer";

interface Props {
  currentUser: User | null;
  posts: UsePostsOptions;
  sandbox: UseSandboxOptions;
}

export const useImages = ({
  currentUser,
  posts,
  sandbox,
}: Props): UseImageOptions => {
  const [isLoading, setIsLoading] = useState(false);
  const [transformedImage, setTransformedImage] = useState("");
  const [mergedImage, setMergedImage] = useState("");
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  const { cloudName } = cloudinaryConfig;

  const cloudy = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const loadImage = async (
    image: string,
    saveOnDB = true
  ): Promise<CloudinaryImageDTO> => {
    const result = await loadImageRequest(image);

    if (currentUser && result.data && saveOnDB) {
      const post = imageToPost({
        image: result.data,
        userUUID: currentUser.userUUID,
      });
      const savedPost = await posts.handleCreatePost(post);
      if (savedPost) {
        sandbox.setOriginalImage(savedPost);
      }
    }
    return result?.data;
  };

  const transformImage = async (post: Post, prompt: string) => {
    setIsLoading(true);
    setIsBackgroundLoaded(false);
    const myImage = cloudy.image(post.cloudPublicId);

    const result = myImage
      .effect(generativeBackgroundReplace().prompt(promptSanitizer(prompt)))
      .toURL();
    setTransformedImage(result);
    await posts.handleUpdatePost({
      ...post,
      backgroundPrompt: prompt,
      transformedImageUrl: result,
      isLoading: true,
    });
    setIsLoading(false);
  };

  const swapFace = async ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => {
    setIsLoading(true);
    const result = await faceSwapRequest({
      source_face_url: source,
      target_url: target,
    });

    if (result) {
      const savedImage = await loadImage(result, false);

      if (savedImage && currentUser) {
        const post = faceSwapToPost({
          image: savedImage,
          userUUID: currentUser.userUUID,
          target,
          source,
        });
        await posts.handleCreatePost(post);
        setTransformedImage(savedImage.secure_url);
      }
    }
    setIsLoading(false);
  };

  const removeBackground = async ({ url }: { url: string }) => {
    const result = await removeBackgroundRequest({ url });

    if (result) {
      const savedImage = await loadImage(result, false);

      if (savedImage && sandbox.originalImage && currentUser) {
        const draft = {
          ...sandbox.originalImage,
          replaceImageUrl: savedImage.secure_url,
        };
        await posts.handleUpdatePost(draft);
        sandbox.setOriginalImage(draft);
      }
    }
  };

  return {
    isLoading,
    setIsLoading,
    transformedImage,
    setTransformedImage,
    mergedImage,
    setMergedImage,
    isBackgroundLoaded,
    setIsBackgroundLoaded,
    load: loadImage,
    transform: transformImage,
    swapFace,
    removeBackground,
  };
};
