import { useState } from "react";
import { UseSandboxOptions } from "../types";
import { TagTypeBase } from "../../components/widgets/TagsManager/TagsManager";
import { Post } from "../../types/Post";

export enum ImageSource {
  LOCAL = "local",
  CLOUD = "cloud",
  CAMERA = "camera",
}

export const IMAGE_SOURCES = [
  {
    id: ImageSource.LOCAL,
    title: "Subir",
  },
  {
    id: ImageSource.CLOUD,
    title: "Mis Imagenes",
  },
  {
    id: ImageSource.CAMERA,
    title: "Camara",
  },
];

export const useSandbox = (): UseSandboxOptions => {
  const [originalImage, setOriginalImage] = useState<Post | null>(
    null
  );
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [imageSource, setImageSource] = useState<TagTypeBase>(IMAGE_SOURCES[0]);

  return {
    originalImage,
    setOriginalImage,
    currentPrompt,
    setCurrentPrompt,
    imageSource,
    setImageSource,
  };
};
