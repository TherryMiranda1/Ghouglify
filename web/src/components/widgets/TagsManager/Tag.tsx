/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { TagType } from "./TagsManager";

interface Props<T> {
  tag: TagType<T>;
  isSelected: boolean;
  onSelect: (item: T) => void;
}

export const Tag = <_, T>({ tag, isSelected, onSelect }: Props<T>) => {
  return (
    <TagStyled onClick={() => onSelect(tag)} $isSelected={isSelected}>
      {tag.title}
      {tag.icon}
    </TagStyled>
  );
};

const TagStyled = styled.button<{ $isSelected: boolean }>`
  background-color: ${({ $isSelected }) =>
    $isSelected ? "var(--tint-color)" : "transparent"};
  border: var(--border);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--small-radius);
  cursor: pointer;

  &:hover {
    background-color: var(--background-card-color);
  }
`;
