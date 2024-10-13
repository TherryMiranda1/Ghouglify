/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Tag } from "./Tag";

export type TagType<T> = T & { id: string; title: string };

interface Props<T> {
  data: TagType<T>[];
  currentTag: T & { id: string; title: string };
  onSelect: (item: T) => void;
}
export const TagsManager = <_, T>({ data, currentTag, onSelect }: Props<T>) => {
  return (
    <TagsRowStyled>
      {data.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          isSelected={tag.id === currentTag.id}
          onSelect={onSelect}
        />
      ))}
    </TagsRowStyled>
  );
};

const TagsRowStyled = styled.section`
  display: flex;
  width: 100%;
  gap: 16px;
`;
