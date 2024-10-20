import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

import { UseImageOptions, UsePostsOptions, UseSandboxOptions } from "../types";
import { cloudinaryConfig } from "../../config/cloudinary";
import { loadImageRequest } from "../../infra/api/images";
import { User } from "../../types/User";
import { imageToPost } from "../../infra/mappers/imageToPost";
import { Post } from "../../types/Post";
import { faceSwapRequest } from "../../infra/api/services";
import { CloudinaryImageDTO } from "../../types/DTOs";

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
  const [transformedImage, setTransformedImage] = useState("");

  const { cloudName } = cloudinaryConfig;

  const cloudy = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const loadImage = async (image: string, saveOnDB = true): Promise<CloudinaryImageDTO> => {
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
    const myImage = cloudy.image(post.cloudPublicId);

    const result = myImage
      .effect(generativeBackgroundReplace().prompt(prompt))
      .toURL();
    setTransformedImage(result);
    posts.handleUpdatePost({
      ...post,
      backgroundPrompt: prompt,
      transformedImageUrl: result,
      isLoading: true,
    });
  };

  const swapFace = async ({
    source,
    target,
  }: {
    source: string;
    target: string;
  }) => {
    const result = await faceSwapRequest({
      source_face_url: source,
      target_url: target,
    });

    if (result) {
      const savedImage = await loadImage(result, false);

      if (savedImage) {
        setTransformedImage(savedImage.original_filename);
      }
    }
  };

  return {
    transformedImage,
    load: loadImage,
    transform: transformImage,
    swapFace,
  };
};
