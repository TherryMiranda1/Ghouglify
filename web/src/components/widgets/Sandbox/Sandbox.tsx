import styled from "styled-components";
import { Card, Header } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";
import { IMAGE_SOURCES, ImageSource } from "../../../context/hooks/useSandbox";
import { Gallery } from "../../../Views/Gallery";
import Camera from "../Camera/Camera";

export const Sandbox = () => {
  const {
    image,
    sandbox: { setImageSource, imageSource },
  } = useGlobalContext();

  return (
    <SandboxStyled>
      <TagsManager
        data={IMAGE_SOURCES}
        currentTag={imageSource}
        onSelect={setImageSource}
      />
      {imageSource.id === ImageSource.LOCAL && (
        <Card>
          <Header text="Sube una imagen" componentType="h3" />
          <InputDrop
            onChange={(value) => {
              image.load(value);
            }}
          />
        </Card>
      )}
      {imageSource.id === ImageSource.CLOUD && (
        <Card>
          <GalleryWrapper>
            <Gallery />
          </GalleryWrapper>
        </Card>
      )}
      {imageSource.id === ImageSource.CAMERA && (
        <Card>
          <Camera />
        </Card>
      )}
    </SandboxStyled>
  );
};

const SandboxStyled = styled.section`
  background-color: var(--background-transparent-color);
  border: var(--border);
  border-radius: var(--small-radius);
  width: 100%;
  min-height: 300px;
  padding: 8px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GalleryWrapper = styled.section`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
`;
