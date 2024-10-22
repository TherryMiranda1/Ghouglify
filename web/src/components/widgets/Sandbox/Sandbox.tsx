import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";

import { ImageSources } from "../ImageSources/ImageSources";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { TransformationsBoard } from "../TransformationsBoard/TransformationsBoard";
import { IMAGE_SOURCES } from "../../../context/GlobalContext.constants";
import { Button, Card } from "../../ui";
import { ImageDownloader } from "../ImageDownloader/ImageDownloader";
import { TransformButton } from "./TransformButton";
import { useShareImage } from "../../../hooks/useShareImage";
import { FaShareAlt } from "react-icons/fa";
import { PumpkingCorner } from "../../ui/decorations/PumpkinCorner";

export const Sandbox = () => {
  const {
    image: {
      transformedImage,
      setTransformedImage,
      mergedImage,
      setMergedImage,
      isBackgroundLoaded,
    },
    sandbox: {
      setImageSource,
      imageSource,
      originalImage,
      setOriginalImage,
      faceSwapTargetAsset,
      setFaceSwapTargetAsset,
    },
  } = useGlobalContext();
  const { isSharingSupported, shareImage } = useShareImage(transformedImage);

  return (
    <SandboxStyled>
      <PumpkingCorner />
      {originalImage ? (
        <TransformationsWrapperStyled>
          <TransformationsStyled>
            <ImagesSectionStyled>
              {mergedImage ? (
                <ImageViewer
                  image={mergedImage}
                  onClose={() => setMergedImage("")}
                />
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
            <>
              {transformedImage ? (
                <Card>
                  <ImageViewer
                    isGeneration
                    image={transformedImage}
                    onClose={() => setTransformedImage("")}
                  />
                  {isBackgroundLoaded && (
                    <ButtonsAreaStyled>
                      <ImageDownloader imageUrl={transformedImage} />
                      {isSharingSupported && (
                        <ShareButtonStyled onClick={() => shareImage()}>
                          Compartir <FaShareAlt />
                        </ShareButtonStyled>
                      )}
                    </ButtonsAreaStyled>
                  )}
                </Card>
              ) : (
                <TransformationsBoard />
              )}
            </>
          </TransformationsStyled>
          <TransformButton />
        </TransformationsWrapperStyled>
      ) : (
        <>
          <TagsManager
            variant="COLUMN"
            data={IMAGE_SOURCES}
            currentTag={imageSource}
            onSelect={setImageSource}
          />
          <ImageSources />
        </>
      )}
    </SandboxStyled>
  );
};

const SandboxStyled = styled.section`
  position: relative;
  background-color: var(--background-transparent-color);
  border: var(--border);
  border-radius: var(--small-radius);
  max-width: ${DEVICE_BREAKPOINTS.md};
  width: 100%;
  min-height: 300px;
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TransformationsWrapperStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const TransformationsStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    flex-direction: row;
  }
`;

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
const ButtonsAreaStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 8px;
`;
const ShareButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;
