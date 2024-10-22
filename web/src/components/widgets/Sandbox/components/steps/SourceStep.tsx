import styled from "styled-components";
import { useGlobalContext } from "../../../../../context/useGlobalContext";
import { Card, Header, LoadingState } from "../../../../ui";
import { InputDrop } from "../../../InputDrop/InputDrop";
import { Camera } from "../../../Camera/Camera";
import { Gallery } from "../../../../../Views/Gallery";
import { ImageSource } from "../../../../../context/types";
import { useState } from "react";
import { TagsManager } from "../../../TagsManager/TagsManager";
import { IMAGE_SOURCES } from "../../../../../context/GlobalContext.constants";

export const SourceStep = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    sandbox: { imageSource, setImageSource, setOriginalImage },
    image,
  } = useGlobalContext();

  return (
    <>
      <TagsManager
        variant="COLUMN"
        data={IMAGE_SOURCES}
        currentTag={imageSource}
        onSelect={setImageSource}
      />
      {imageSource.id === ImageSource.LOCAL && (
        <SourceWrapper>
          <Header text="Sube una imagen" componentType="h3" />
          {isLoading ? (
            <LoadingState />
          ) : (
            <InputDrop
              onChange={async (value) => {
                if (!value) return;

                setIsLoading(true);
                await image.load(value.content);
                setIsLoading(false);
              }}
            />
          )}
        </SourceWrapper>
      )}
      {imageSource.id === ImageSource.CLOUD && (
        <SourceWrapper>
          <GalleryWrapper>
            <Gallery onSelect={(post) => setOriginalImage(post)} />
          </GalleryWrapper>
        </SourceWrapper>
      )}
      {imageSource.id === ImageSource.CAMERA && (
        <SourceWrapper>
          {isLoading ? (
            <LoadingState />
          ) : (
            <Camera
              onChange={async (value) => {
                setIsLoading(true);
                await image.load(value.content);
                setIsLoading(false);
              }}
            />
          )}
        </SourceWrapper>
      )}
    </>
  );
};

const SourceWrapper = styled(Card)`
  width: 100%;
  max-height: 400px;
`;
const GalleryWrapper = styled.section`
  width: 100%;
  border-radius: var(--card-radius);
  overflow-y: auto;
`;
