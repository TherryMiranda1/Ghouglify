import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";

import { ImageSources } from "../ImageSources/ImageSources";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { TransformationsBoard } from "../TransformationsBoard/TransformationsBoard";
import { IMAGE_SOURCES } from "../../../context/GlobalContext.constants";
import { Card } from "../../ui";
import { ImageDownloader } from "../ImageDownloader/ImageDownloader";
import { TransformButton } from "./TransformButton";

export const Sandbox = () => {
  const {
    image: {
      transformedImage,
      setTransformedImage,
      mergedImage,
      setMergedImage,
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

  return (
    <SandboxStyled>
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
                    image={transformedImage}
                    onClose={() => setTransformedImage("")}
                  />
                  <ImageDownloader imageUrl={transformedImage} />
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
