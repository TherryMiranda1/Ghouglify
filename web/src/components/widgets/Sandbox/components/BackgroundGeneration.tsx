import { useGlobalContext } from "../../../../context/useGlobalContext";
import { Card, TextArea } from "../../../ui";

export const BackgroundGeneration = () => {
  const {  sandbox } = useGlobalContext();
  return (
    <Card>
      <TextArea
        placeholder="Creamos un fondo muy tenebroso?"
        value={sandbox.currentPrompt}
        onChange={(text) => sandbox.setCurrentPrompt(text as string)}
      />
    </Card>
  );
};
