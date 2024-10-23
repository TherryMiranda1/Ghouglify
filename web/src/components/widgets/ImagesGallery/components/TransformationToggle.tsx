import { FaUser } from "react-icons/fa";
import { SiGhostery } from "react-icons/si";
import styled from "styled-components";

export const TransformationToggle = ({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: () => void;
}) => {
  return (
    <ShowToggleStyled onClick={onToggle}>
      {show ? <SiGhostery color="var(--tint-color)" /> : <FaUser />}
    </ShowToggleStyled>
  );
};

const ShowToggleStyled = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0;
  border: var(--border);
  background-color: var(--background-transparent-color);
  border-bottom-right-radius: var(--card-radius);
  border-top-left-radius: var(--card-radius);
  font-size: 16px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
