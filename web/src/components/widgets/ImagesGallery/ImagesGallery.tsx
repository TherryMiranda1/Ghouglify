import styled from "styled-components";
import { Post } from "../../../types/Post";
import { ImagesGalleryCard } from "./ImagesGalleryCard";
import { filterEven, filterOdd } from "../../../utils/filter";

interface Props {
  posts: Post[];
  onSelect?: (item: Post) => void;
}

export const ImagesGallery = ({ posts, onSelect }: Props) => {
  return (
    <ContainerStyled>
      <RowStyled>
        {filterEven(posts).map((post) => (
          <ImagesGalleryCard key={post._id} post={post} onSelect={onSelect} />
        ))}
      </RowStyled>
      <RowStyled>
        {filterOdd(posts).map((post) => (
          <ImagesGalleryCard key={post._id} post={post} onSelect={onSelect} />
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
