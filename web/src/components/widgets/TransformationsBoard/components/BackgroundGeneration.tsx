import { useGlobalContext } from "../../../../context/useGlobalContext";
import { Button, Card, Input } from "../../../ui";

export const BackgroundGeneration = () => {
  const { image, sandbox } = useGlobalContext();
  return (
    <Card>
      <Input
        placeholder="Creemos un fondo muy tenebroso?"
        value={sandbox.currentPrompt}
        onChange={(text) => sandbox.setCurrentPrompt(text as string)}
      />
      <Button
        disabled={!sandbox.originalImage || !sandbox.currentPrompt}
        onClick={() => {
          if (sandbox.originalImage && sandbox.currentPrompt) {
            image.transform(sandbox.originalImage, sandbox.currentPrompt);
          }
        }}
      >
        Transformar
      </Button>
    </Card>
  );
};
