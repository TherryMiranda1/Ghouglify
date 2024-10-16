import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../../constants/devices";
import { Post } from "../../../../types/Post";
import { OptionsToggle } from "../../OptionsToggle/OptionsToggle";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { getAspectRatio } from "../../../../utils/getAspectRatio";
import { useEffect, useState } from "react";
import { TransformationToggle } from "./TransformationToggle";
import { ImageLoader } from "./ImageLoader";

interface Props {
  post: Post;
  onSelect?: (item: Post) => void;
  showTransformationInitialValue?: boolean;
}

export const ImagesGalleryCard = ({
  post,
  onSelect,
  showTransformationInitialValue = false,
}: Props) => {
  const [showTransformation, setShowTransformation] = useState(
    showTransformationInitialValue
  );
  const {
    posts: { currentToggledPost, setCurrentToggledPost, handleUpdatePost },
  } = useGlobalContext();

  const isToggled = currentToggledPost?._id === post._id;

  useEffect(() => {
    setShowTransformation(showTransformationInitialValue);
  }, [showTransformationInitialValue]);

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
      <ImageLoader
        post={post}
        onSelect={onSelect}
        showTransformation={showTransformation}
        onLoad={() => {
          if (post.isLoading === true) {
            handleUpdatePost({ ...post, isLoading: false });
          }
        }}
      />
      <TransformationToggle
        show={showTransformation}
        onToggle={() => setShowTransformation(!showTransformation)}
      />
    </CardStyled>
  );
};

const CardStyled = styled.button<{ $aspectRatio: number }>`
  padding: 0;
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
