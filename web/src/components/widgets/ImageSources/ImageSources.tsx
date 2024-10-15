import styled from "styled-components";
import { ImageSource } from "../../../context/hooks/useSandbox";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Card, Header } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { Camera } from "../Camera/Camera";
import { Gallery } from "../../../Views/Gallery";

export const ImageSources = () => {
  const {
    sandbox: { imageSource, setOriginalImage },
    image,
  } = useGlobalContext();
  return (
    <>
      {imageSource.id === ImageSource.LOCAL && (
        <SourceWrapper>
          <Header text="Sube una imagen" componentType="h3" />
          <InputDrop
            onChange={(value) => {
              image.load(value.content);
            }}
          />
        </SourceWrapper>
      )}
      {imageSource.id === ImageSource.CLOUD && (
        <SourceWrapper>
          <GalleryWrapper>
            <Gallery
              onSelect={(post) =>
                setOriginalImage({
                  content: post.originalImageUrl,
                  title: post.name,
                })
              }
            />
          </GalleryWrapper>
        </SourceWrapper>
      )}
      {imageSource.id === ImageSource.CAMERA && (
        <SourceWrapper>
          <Camera onChange={(value) => image.load(value.content)} />
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