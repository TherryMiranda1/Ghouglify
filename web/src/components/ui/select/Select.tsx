import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"select"> & {
  onChange?: (value: string) => void;
  options: { value: string; label?: string }[];
};

export const Select = ({ onChange, options, ...props }: Props) => {
  return (
    <SelectStyled
      className="input"
      {...props}
      onChange={(e) => onChange?.(e.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </SelectStyled>
  );
};

const SelectStyled = styled.select`
  width: 100%;
  padding: 12px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }

  option {
    padding: 10px;
    border-bottom: var(--border-color);
  }
`;
