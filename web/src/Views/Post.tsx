import { useParams } from "@tanstack/react-router";
import { useAsyncCall } from "../hooks/useAsyncCall";
import { getPostByIdRequest } from "../infra/api/posts";
import { useEffect, useState } from "react";
import { LoadingState } from "../components";

import styled from "styled-components";
import { OptionsToggle } from "../components/widgets/OptionsToggle/OptionsToggle";
import { TransformationToggle } from "../components/widgets/ImagesGallery/components/TransformationToggle";

export const PostView = () => {
  const { isLoading, isError, data, call } = useAsyncCall(getPostByIdRequest);
  const { postId } = useParams({ strict: false });
  const [isToggled, setIsToggled] = useState(true);
  const hasTransformation = !!data?.transformedImageUrl;
  
  useEffect(() => {
    if (postId) {
      call({ postId });
    }
  }, [postId]);

  if (isLoading) {
    return <LoadingState />;
  }
  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {data && (
        <PostContainerStyled>
          <ImagePostStyled
            src={
              isToggled && data.transformedImageUrl
                ? data.transformedImageUrl
                : data.originalImageUrl
            }
          />
          <ImageOptionsStyled>
            <OptionsToggle post={data} isOpen={true} variant="ROW" />
          </ImageOptionsStyled>
          {hasTransformation && (
            <TransformationToggle
              show={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          )}
        </PostContainerStyled>
      )}
    </>
  );
};

const PostContainerStyled = styled.div`
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  padding: 8px;
  min-height: 70vh;
  overflow-y: auto;
  width: 100%;
`;

const ImagePostStyled = styled.img`
  max-height: 70vh;
  max-width: 100%;
  border-radius: var(--card-radius);
  object-fit: cover;
`;

const ImageOptionsStyled = styled.div`
  width: 100%;
  display: flex;
  margin-top: -32px;
  justify-content: center;
  align-items: center;
`;
