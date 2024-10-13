import { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

import { UseImageOptions, UsePostsOptions } from "../types";
import { cloudinaryConfig } from "../../config/cloudinary";
import { loadImageRequest } from "../../infra/api/images";
import { User } from "../../types/User";
import { imageToPost } from "../../infra/mappers/imageToPost";

interface Props {
  currentUser: User | null;
  posts: UsePostsOptions;
}

export const useImages = ({ currentUser, posts }: Props): UseImageOptions => {
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
      posts.handleCreatePost(post);
    }
  };

  const downloadImage = () => {};
  const transformImage = async (imageId: string, prompt: string) => {
    const myImage = cloudy.image(imageId);

    const result = await myImage
      .effect(generativeBackgroundReplace().prompt(prompt))
      .toURL();
    setTransformedImage(result);
  };

  return {
    imageData,
    transformedImage,
    load: loadImage,
    download: downloadImage,
    transform: transformImage,
  };
};
