import styled from "styled-components";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { ImageViewer } from "../../ImageViewer/ImageViewer";
import { DEVICE_BREAKPOINTS } from "../../../../constants/devices";

export const ImagesVisualizer = () => {
  const {
    image: { mergedImage, setMergedImage },
    sandbox: {
      originalImage,
      setOriginalImage,
      faceSwapTargetAsset,
      setFaceSwapTargetAsset,
    },
  } = useGlobalContext();

  if (!originalImage) return null;
  
  return (
    <ImagesSectionStyled>
      {mergedImage ? (
        <ImageViewer image={mergedImage} onClose={() => setMergedImage("")} />
      ) : (
        <>
          <ImageViewer
            image={originalImage.originalImageUrl}
            onClose={() => setOriginalImage(null)}
            aspectRatio={4 / 4}
          />

          {faceSwapTargetAsset && (
            <ImageViewer
              image={faceSwapTargetAsset.originalImageUrl}
              onClose={() => setFaceSwapTargetAsset(null)}
              aspectRatio={4 / 4}
            />
          )}
        </>
      )}
    </ImagesSectionStyled>
  );
};

const ImagesSectionStyled = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  div {
    width: 100%;
    max-width: ${DEVICE_BREAKPOINTS["2xs"]};
  }

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    flex-direction: column;

    div {
      width: 100%;
      min-width: ${DEVICE_BREAKPOINTS["2xs"]};
    }
  }
`;
