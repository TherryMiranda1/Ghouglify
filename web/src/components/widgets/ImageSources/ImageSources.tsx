import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Card, Header, LoadingState } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { Camera } from "../Camera/Camera";
import { Gallery } from "../../../Views/Gallery";
import { ImageSource } from "../../../context/types";
import { useState } from "react";

export const ImageSources = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    sandbox: { imageSource, setOriginalImage },
    image,
  } = useGlobalContext();

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <>
      {imageSource.id === ImageSource.LOCAL && (
        <SourceWrapper>
          <Header text="Sube una imagen" componentType="h3" />
          <InputDrop
            onChange={async (value) => {
              if (!value) return;

              setIsLoading(true);
              await image.load(value.content);
              setIsLoading(false);
            }}
          />
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
          <Camera
            onChange={async (value) => {
              setIsLoading(true);
              await image.load(value.content);
              setIsLoading(false);
            }}
          />
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
