import { useState } from "react";
import { UseSandboxOptions } from "../types";
import { TagTypeBase } from "../../components/widgets/TagsManager/TagsManager";
import { Post } from "../../types/Post";
import {
  IMAGE_SOURCES,
  TRANSFORMATION_OPTIONS,
} from "../GlobalContext.constants";
import { Asset } from "../../types/Asset";

export const useSandbox = (): UseSandboxOptions => {
  const [originalImage, setOriginalImage] = useState<Post | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<string>("");
  const [imageSource, setImageSource] = useState<TagTypeBase>(IMAGE_SOURCES[0]);
  const [faceSwapTargetAsset, setFaceSwapTargetAsset] = useState<Asset | null>(
    null
  );
  const [currentTransformationOption, setCurrentTransformationOption] =
    useState<TagTypeBase>(TRANSFORMATION_OPTIONS[0]);

  return {
    originalImage,
    setOriginalImage,
    currentPrompt,
    setCurrentPrompt,
    imageSource,
    setImageSource,
    currentTransformationOption,
    setCurrentTransformationOption,
    faceSwapTargetAsset,
    setFaceSwapTargetAsset,
  };
};
