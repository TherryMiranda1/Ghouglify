/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { cloudinaryConfig } from "../config/cloudinary";
import { loadImageRequest } from "../api/images";
import { generativeBackgroundReplace } from "@cloudinary/url-gen/actions/effect";

interface Props {
  children: JSX.Element | JSX.Element[];
}

interface ImageOptions {
  imageData: any;
  transformedImage: any;
  load: (image: string) => void;
  download: () => void;
  transform: (imageId: string, prompt: string) => void;
}

interface CloudinaryReturnType {
  image: ImageOptions;
  prompt: {
    currentPrompt: string;
    setCurrentPrompt: (prompt: string) => void;
  };
}

export const CloudinaryContext = createContext<CloudinaryReturnType>(
  {} as CloudinaryReturnType
);

export const CloudinaryContainer = ({ children }: Props) => {
  const [imageData, setImageData] = useState();
  const [transformedImage, setTransformedImage] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const { cloudName } = cloudinaryConfig;

  const cloudy = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  const loadImage = async (image: string) => {
    const result = await loadImageRequest(image);
    console.log(result);
    setImageData(result.data);
  };
  const downloadImage = () => {};
  const transformImage = async (imageId: string, prompt: string) => {
    const myImage = cloudy.image(imageId);

    const result = await myImage
      .effect(generativeBackgroundReplace().prompt(prompt))
      .toURL();
      console.log(result)
    setTransformedImage(result);
  };

  const image = {
    imageData,
    transformedImage,
    load: loadImage,
    download: downloadImage,
    transform: transformImage,
  };
  return (
    <CloudinaryContext.Provider
      value={{ image, prompt: { currentPrompt, setCurrentPrompt } }}
    >
      {children}
    </CloudinaryContext.Provider>
  );
};
