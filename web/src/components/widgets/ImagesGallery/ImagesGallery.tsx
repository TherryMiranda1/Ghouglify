import styled from "styled-components";
import { Post } from "../../../types/Post";
import { ImagesGalleryCard } from "./components/ImagesGalleryCard";
import { filterEven, filterOdd } from "../../../utils/filter";

interface Props {
  posts: Post[];
  onSelect?: (item: Post) => void;
  showTransformationInitialValue?: boolean;
}

export const ImagesGallery = ({
  posts,
  onSelect,
  showTransformationInitialValue,
}: Props) => {
  return (
    <ContainerStyled>
      <RowStyled>
        {filterOdd(posts).map((post) => (
          <ImagesGalleryCard
            key={post._id}
            post={post}
            onSelect={onSelect}
            showTransformationInitialValue={showTransformationInitialValue}
          />
        ))}
      </RowStyled>
      <RowStyled>
        {filterEven(posts).map((post) => (
          <ImagesGalleryCard
            key={post._id}
            post={post}
            onSelect={onSelect}
            showTransformationInitialValue={showTransformationInitialValue}
          />
        ))}
      </RowStyled>
    </ContainerStyled>
  );
};

const ContainerStyled = styled.section`
  display: flex;
  gap: 16px;
  padding: 16px 0;
`;

const RowStyled = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;
