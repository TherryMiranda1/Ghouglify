/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { Tag } from "./Tag";

export type TagTypeBase = {
  id: string;
  title: string;
  icon?: JSX.Element;
};
export type TagType<T> = T & TagTypeBase;

export type TagsVariant = "ROW" | "COLUMN";

interface Props<T> {
  variant?: TagsVariant;
  data: TagType<T>[];
  currentTag: T & TagTypeBase;
  onSelect: (item: T ) => void;
}
export const TagsManager = <_, T>({
  data,
  currentTag,
  onSelect,
  variant = "ROW",
}: Props<T>) => {
  return (
    <TagsRowStyled $variant={variant}>
      {data.map((tag) => (
        <Tag
          variant={variant}
          key={tag.id}
          tag={tag}
          isSelected={tag.id === currentTag.id}
          onSelect={onSelect}
        />
      ))}
    </TagsRowStyled>
  );
};

const TagsRowStyled = styled.section<{ $variant: TagsVariant }>`
  display: flex;
  width: 100%;
  justify-content: ${({ $variant }) =>
    $variant === "ROW" ? "flex-start" : "space-between"};
  overflow-x: auto;
  gap: ${({ $variant }) => ($variant === "ROW" ? "8px" : "4px")};
`;
