import styled from "styled-components";
import { Image } from "../../ui";
import { ICON_SIZES } from "../../../constants/sizes";
import { IoCloseOutline } from "react-icons/io5";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

interface Props {
  image: string;
  onClose: () => void;
  width?: number;
  height?: number;
  aspectRatio?: number;
}

export const ImageViewer = ({
  image,
  onClose,
  width,
  height,
  aspectRatio,
}: Props) => {
  return (
    <ImageViewerStyled>
      <CloseButtonStyled onClick={() => onClose()}>
        <IoCloseOutline size={ICON_SIZES.md} />
      </CloseButtonStyled>
      <Image
        src={image}
        $width={width}
        $height={height}
        $aspectRatio={aspectRatio}
      />
    </ImageViewerStyled>
  );
};

const ImageViewerStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
    padding: 2px;
    svg {
      font-size: 16px;
    }
  }
`;
