import { useGlobalContext } from "../../../../context/useGlobalContext";
import { AssetsView } from "../../../../Views/Assets";
import { Button, Card } from "../../../ui";

export const FaceSwaping = () => {
  const { image, sandbox } = useGlobalContext();
  return (
    <Card>
      <AssetsView
        selectedItem={sandbox.faceSwapTargetAsset}
        onSelect={(asset) => sandbox.setFaceSwapTargetAsset(asset)}
      />
      <Button
        disabled={!sandbox.faceSwapTargetAsset}
        onClick={() => {
          if (sandbox.originalImage && sandbox.faceSwapTargetAsset) {
            image.swapFace({
              source: sandbox.originalImage.originalImageUrl,
              target: sandbox.faceSwapTargetAsset.originalImageUrl,
            });
          }
        }}
      >
        Transformar
      </Button>
    </Card>
  );
};
