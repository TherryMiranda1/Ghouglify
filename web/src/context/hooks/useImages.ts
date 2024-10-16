import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

import { UseImageOptions, UsePostsOptions, UseSandboxOptions } from "../types";
import { cloudinaryConfig } from "../../config/cloudinary";
import { loadImageRequest } from "../../infra/api/images";
import { User } from "../../types/User";
import { imageToPost } from "../../infra/mappers/imageToPost";
import { Post } from "../../types/Post";

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
  const [imageData, setImageData] = useState();
  const [transformedImage, setTransformedImage] = useState("");

  const { cloudName } = cloudinaryConfig;

  const cloudy = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const loadImage = async (image: string) => {
    const result = await loadImageRequest(image);

    setImageData(result.data);
    if (currentUser && result.data) {
      const post = imageToPost({
        image: result.data,
        userUUID: currentUser.userUUID,
      });
      const savedPost = await posts.handleCreatePost(post);
      if (savedPost) {
        sandbox.setOriginalImage(savedPost);
      }
    }
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

  return {
    imageData,
    transformedImage,
    load: loadImage,
    transform: transformImage,
  };
};
