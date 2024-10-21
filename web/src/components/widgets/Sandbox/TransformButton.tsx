/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { TransformationOptions } from "../../../context/types";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Button } from "../../ui";
import toast from "react-hot-toast";

export const TransformButton = () => {
  const {
    posts: { handleCreatePost },
    image: { mergedImage, transform, swapFace, isLoading },
    sandbox: {
      currentTransformationOption,
      originalImage,
      currentPrompt,
      backgroundReplaceAsset,
      faceSwapTargetAsset,
    },
  } = useGlobalContext();

  const generationDisabled = !originalImage || !currentPrompt;
  const replaceDisabled = !originalImage || !mergedImage;
  const swapDisabled = !originalImage || !faceSwapTargetAsset;

  const isDisabled = () => {
    switch (currentTransformationOption.id) {
      case TransformationOptions.BACKGROUND_GENERATION:
        return generationDisabled;
      case TransformationOptions.BACKGROUND_REPLACE:
        return replaceDisabled;
      case TransformationOptions.FACE_SWAPING:
        return swapDisabled;
      default:
        return true;
    }
  };
  const handleClick = async () => {
    if (
      currentTransformationOption.id ===
      TransformationOptions.BACKGROUND_GENERATION
    ) {
      if (!generationDisabled) {
        transform(originalImage, currentPrompt);
      }
    }
    if (
      currentTransformationOption.id ===
      TransformationOptions.BACKGROUND_REPLACE
    ) {
      if (!replaceDisabled) {
        const { _id, ...rest } = originalImage;
        await handleCreatePost({
          ...rest,
          objectsPrompt: backgroundReplaceAsset?.originalImageUrl,
          transformedImageUrl: mergedImage,
        });
        toast.success("Se ha completado la transformación!");
      }
    }
    if (currentTransformationOption.id === TransformationOptions.FACE_SWAPING) {
      if (!swapDisabled) {
        swapFace({
          source: originalImage.originalImageUrl,
          target: faceSwapTargetAsset.originalImageUrl,
        });
      }
    }
  };
  return (
    <TransformButtonStyled
      disabled={isDisabled() || isLoading}
      onClick={() => handleClick()}
    >
      {isLoading ? "Transformando..." : "Transformar"}
    </TransformButtonStyled>
  );
};

const TransformButtonStyled = styled(Button)`
  width: 100%;
`;
