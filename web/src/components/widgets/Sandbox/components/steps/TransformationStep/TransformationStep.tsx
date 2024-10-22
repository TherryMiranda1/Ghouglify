import styled from "styled-components";
import { useGlobalContext } from "../../../../../../context/useGlobalContext";
import { DEVICE_BREAKPOINTS } from "../../../../../../constants/devices";
import { TransformButton } from "../../TransformButton";
import { TransformationsBoard } from "../TransformationsBoard";
import { ImagesVisualizer } from "../../ImagesVisualizer";
import { ResultsStep } from "../ResultsStep";

export const TransformationStep = () => {
  const {
    image: { transformedImage },
    sandbox: { originalImage },
  } = useGlobalContext();

  if (!originalImage) return null;
  return (
    <TransformationsWrapperStyled>
      <TransformationsStyled>
        <ImagesVisualizer />
        {transformedImage ? <ResultsStep /> : <TransformationsBoard />}
      </TransformationsStyled>
      <TransformButton />
    </TransformationsWrapperStyled>
  );
};

const TransformationsWrapperStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
`;

const TransformationsStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    flex-direction: row;
  }
`;
