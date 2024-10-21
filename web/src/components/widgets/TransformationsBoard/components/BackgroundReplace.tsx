import { useEffect } from "react";
import { AssetFilter } from "../../../../context/types";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { AssetsView } from "../../../../Views/Assets";
import { Card, LoadingState } from "../../../ui";
import { useImageMerge } from "../../../../hooks/useImageMerge";

export const BackgroundReplace = () => {
  const {
    image: { removeBackground, setMergedImage },
    sandbox: {
      originalImage,
      backgroundReplaceAsset,
      setBackgroundReplaceAsset,
    },
  } = useGlobalContext();
  useImageMerge(
    originalImage?.replaceImageUrl,
    backgroundReplaceAsset?.originalImageUrl,
    setMergedImage
  );

  useEffect(() => {
    if (originalImage && !originalImage.replaceImageUrl) {
      removeBackground({ url: originalImage.originalImageUrl });
    }
  }, [originalImage]);

  if (!originalImage?.replaceImageUrl) {
    return <LoadingState />;
  }

  return (
    <Card>
      <AssetsView
        selectedItem={backgroundReplaceAsset}
        onSelect={(asset) => setBackgroundReplaceAsset(asset)}
        filterBy={AssetFilter.BACKGROUND}
      />
    </Card>
  );
};
