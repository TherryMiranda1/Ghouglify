import { DEMO_PROMPTS } from "../../../../assets/demoPrompts";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { Card, TextArea } from "../../../ui";
import { AssetsGallery } from "../../AssetsGallery/AssetsGallery";

export const BackgroundGeneration = () => {
  const { sandbox } = useGlobalContext();

  const prompts = DEMO_PROMPTS;
  const selectedItem = prompts.find(
    (prompt) => prompt.name === sandbox.currentPrompt
  );

  return (
    <Card>
      <TextArea
        placeholder="Shall we create something spooky? (English only)"
        value={sandbox.currentPrompt}
        onChange={(text) => sandbox.setCurrentPrompt(text as string)}
      />

      <AssetsGallery
        assets={prompts}
        selectedItem={selectedItem}
        onSelect={(asset) => sandbox.setCurrentPrompt(asset.name)}
      />
    </Card>
  );
};
