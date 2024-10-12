import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"input"> & {
  onChange?: (value: string) => void;
};

export const Input = ({ ...props }: Props) => {
  return (
    <InputStyled
      className="input"
      {...props}
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
};

const InputStyled = styled.input``;
