import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Image } from "../../ui";
import { ICON_SIZES } from "../../../constants/sizes";
import { IoCloseOutline } from "react-icons/io5";

export const ImageViewer = () => {
  const {
    sandbox: { originalImage, setOriginalImage },
  } = useGlobalContext();

  return (
    <ImageViewerStyled>
      <CloseButtonStyled onClick={() => setOriginalImage(null)}>
        <IoCloseOutline size={ICON_SIZES.md} />
      </CloseButtonStyled>
      <Image src={originalImage?.content as string} />
    </ImageViewerStyled>
  );
};

const ImageViewerStyled = styled.section`
  position: relative;
  overflow: hidden;
  border-radius: var(--card-radius);
`;
const CloseButtonStyled = styled.button`
  border-radius: 0;
  background-color: var(--background-transparent-color);
  border-bottom-left-radius: var(--card-radius);
  position: absolute;
  padding: 4px;
  top: 0;
  right: 0;
`;
