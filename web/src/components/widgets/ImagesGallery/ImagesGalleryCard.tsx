import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { Post } from "../../../types/Post";
import { OptionsToggle } from "../OptionsToggle/OptionsToggle";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { getAspectRatio } from "../../../utils/getAspectRatio";

interface Props {
  post: Post;
}

export const ImagesGalleryCard = ({ post }: Props) => {
  const {
    posts: { currentToggledPost, setCurrentToggledPost },
  } = useGlobalContext();

  const isToggled = currentToggledPost?._id === post._id;

  return (
    <CardStyled
      $aspectRatio={getAspectRatio(post.width, post.height)}
      className="card"
    >
      <OptionsToggle
        post={post}
        isOpen={isToggled}
        onOpen={() => setCurrentToggledPost(post)}
        onClose={() => setCurrentToggledPost(null)}
      />
      <ImageStyled src={post.originalImageUrl} />
    </CardStyled>
  );
};

const CardStyled = styled.article<{ $aspectRatio: number }>`
  display: flex;
  position: relative;
  flex-direction: column;
  max-width: ${DEVICE_BREAKPOINTS.sm};
  gap: 16px;
  width: 100%;
  aspect-ratio: ${(props) => props.$aspectRatio};
  box-sizing: border-box;
  overflow: hidden;
`;

const ImageStyled = styled.img`
  position: absolute;
  object-fit: cover;
  width: 100%;
`;
