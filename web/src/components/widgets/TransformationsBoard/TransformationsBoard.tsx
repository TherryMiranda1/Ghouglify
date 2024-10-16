import styled from "styled-components";
import { Button, Input } from "../../ui";
import { useGlobalContext } from "../../../context/useGlobalContext";

export const TransformationsBoard = () => {
  const { image, sandbox } = useGlobalContext();
  return (
    <TransformationsBoardStyled>
      <Input
        placeholder="Como quieres transformar esta imagen?"
        value={sandbox.currentPrompt}
        onChange={(text) => sandbox.setCurrentPrompt(text as string)}
      />
      <Button
        onClick={() => {
          if (sandbox.originalImage && sandbox.currentPrompt) {
            image.transform(sandbox.originalImage, sandbox.currentPrompt);
          }
        }}
      >
        Transformar
      </Button>
    </TransformationsBoardStyled>
  );
};

const TransformationsBoardStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;
