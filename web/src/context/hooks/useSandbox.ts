import { useState } from "react";
import { UseSandboxOptions } from "../types";

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
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [imageSource, setImageSource] = useState<{ id: string; title: string }>(
    IMAGE_SOURCES[0]
  );

  return {
    currentPrompt,
    setCurrentPrompt,
    imageSource,
    setImageSource,
  };
};
