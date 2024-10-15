import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";
import { IMAGE_SOURCES } from "../../../context/hooks/useSandbox";
import { ImageSources } from "../ImageSources/ImageSources";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

export const Sandbox = () => {
  const {
    sandbox: { setImageSource, imageSource, originalImage },
  } = useGlobalContext();

  return (
    <SandboxStyled>
      {originalImage ? (
        <ImageViewer />
      ) : (
        <>
          <TagsManager
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
  max-width: ${DEVICE_BREAKPOINTS.sm};
  width: 100%;
  min-height: 300px;
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
