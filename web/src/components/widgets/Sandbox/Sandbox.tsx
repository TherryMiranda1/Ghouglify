import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";

import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { PumpkingCorner } from "../../ui/decorations/PumpkinCorner";
import { SourceStep } from "./components/steps/SourceStep";
import { TransformationStep } from "./components/steps/TransformationStep/TransformationStep";

export const Sandbox = () => {
  const {
    sandbox: { originalImage },
  } = useGlobalContext();

  return (
    <SandboxStyled>
      <PumpkingCorner />
      {originalImage ? <TransformationStep /> : <SourceStep />}
    </SandboxStyled>
  );
};

const SandboxStyled = styled.section`
  position: relative;
  background-color: var(--background-transparent-color);
  border: var(--border);
  border-radius: var(--small-radius);
  max-width: ${DEVICE_BREAKPOINTS.md};
  width: 100%;
  min-height: 300px;
  padding: 8px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
