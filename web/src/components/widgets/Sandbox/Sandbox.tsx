import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";

import { ImageSources } from "../ImageSources/ImageSources";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { TransformationsBoard } from "../TransformationsBoard/TransformationsBoard";
import { IMAGE_SOURCES } from "../../../context/GlobalContext.constants";

export const Sandbox = () => {
  const {
    sandbox: { setImageSource, imageSource, originalImage, setOriginalImage },
  } = useGlobalContext();

  return (
    <SandboxStyled>
      {originalImage ? (
        <TransformationsStyled>
          <ImageViewer
            image={originalImage.originalImageUrl}
            onClose={() => setOriginalImage(null)}
          />
          <TransformationsBoard />
        </TransformationsStyled>
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
const TransformationsStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.md}) {
    flex-direction: row;

    & > :nth-child(2) {
      width: 50%;
      max-height: 80vh;
      overflow-y: auto;
    }
  }
`;
