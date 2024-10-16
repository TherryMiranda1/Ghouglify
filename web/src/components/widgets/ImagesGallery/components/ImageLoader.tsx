import styled from "styled-components";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { Post } from "../../../../types/Post";
import { getAspectRatio } from "../../../../utils/getAspectRatio";
import { useState } from "react";
import { LoadingState } from "../../../ui";

interface Props {
  post: Post;
  onSelect?: (item: Post) => void;
  showTransformation?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export const ImageLoader = ({
  post,
  onSelect,
  onLoad,
  showTransformation,
}: Props) => {
  const [isLoading, setIsLoading] = useState(post.isLoading);

  const {
    posts: { setCurrentToggledPost },
  } = useGlobalContext();
  return (
    <>
      {isLoading && <LoadingState />}
      <ImageStyled
        $aspectRatio={getAspectRatio(post.width, post.height)}
        onError={() => {
          setIsLoading(false);
        }}
        onLoad={() => {
          setIsLoading(false);
          onLoad?.();
        }}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentToggledPost(null);
          onSelect?.(post);
        }}
        src={
          showTransformation ? post.transformedImageUrl : post.originalImageUrl
        }
      />
    </>
  );
};

const ImageStyled = styled.img<{ $aspectRatio: number }>`
  position: absolute;
  object-fit: cover;
  width: 100%;
  aspect-ratio: ${(props) => props.$aspectRatio};
`;
