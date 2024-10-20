/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components";
import { TagsVariant, TagType } from "./TagsManager";

interface Props<T> {
  variant?: "ROW" | "COLUMN";
  tag: TagType<T>;
  isSelected: boolean;
  onSelect: (item: T) => void;
}

export const Tag = <_, T>({
  tag,
  isSelected,
  onSelect,
  variant = "ROW",
}: Props<T>) => {
  return (
    <TagStyled
      $variant={variant}
      onClick={() => onSelect(tag)}
      $isSelected={isSelected}
    >
      {tag.title}
      {tag.icon}
    </TagStyled>
  );
};

const TagStyled = styled.button<{
  $isSelected: boolean;
  $variant: TagsVariant;
}>`
  background-color: ${({ $isSelected, $variant }) =>
    !$isSelected
      ? "transparent"
      : $variant === "ROW"
        ? "var(--tint-color)"
        : "var(--background-card-color)"};
  display: flex;
  border: ${({ $variant }) => ($variant === "ROW" ? "var(--border)" : "none")};
  padding: ${({ $variant }) => ($variant === "ROW" ? "4px 8px" : "8px")};
  flex-direction: ${({ $variant }) =>
    $variant === "ROW" ? "row" : "column-reverse"};
  border-radius: var(--small-radius);
  width: ${({ $variant }) => ($variant === "ROW" ? "auto" : "100%")};
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--background-card-color);
  }
  &:focus {
    background-color: ${({ $variant }) =>
      $variant === "ROW"
        ? "var(--tint-color)"
        : "var(--background-card-color)"};
  }
  svg {
    font-size: ${({ $variant }) => ($variant === "ROW" ? "20px" : "24px")};
  }
`;
