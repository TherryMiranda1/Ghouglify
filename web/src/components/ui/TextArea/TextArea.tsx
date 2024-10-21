import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"textarea"> & {
  onChange?: (value: string) => void;
  isTextarea?: boolean;
};

export const TextArea = ({ ...props }: Props) => {
  return (
    <TextAreaStyled
      className="input"
      {...props}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

const TextAreaStyled = styled.textarea`
  box-sizing: border-box;
  min-height: 80px;
  font-size: 16px;
  font-family: inherit;
  padding: 8px;
  border: var(--border);
`;
