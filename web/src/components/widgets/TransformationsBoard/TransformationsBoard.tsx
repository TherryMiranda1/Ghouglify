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
      {image.imageData && (
        <Button
          onClick={() =>
            image.transform(image.imageData.public_id, sandbox.currentPrompt)
          }
        >
          Transformar
        </Button>
      )}
    </TransformationsBoardStyled>
  );
};

const TransformationsBoardStyled = styled.section``;
