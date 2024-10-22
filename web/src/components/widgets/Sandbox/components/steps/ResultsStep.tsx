import styled from "styled-components";
import { Button, Card } from "../../../../ui";
import { ImageViewer } from "../../../ImageViewer/ImageViewer";
import { FaShareAlt } from "react-icons/fa";
import { useGlobalContext } from "../../../../../context/useGlobalContext";
import { useShareImage } from "../../../../../hooks/useShareImage";
import { ImageDownloader } from "../../../ImageDownloader/ImageDownloader";

export const ResultsStep = () => {
  const {
    image: {
      transformedImage,
      setTransformedImage,

      isBackgroundLoaded,
    },
  } = useGlobalContext();
  const { isSharingSupported, shareImage } = useShareImage(transformedImage);

  return (
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
  );
};

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
