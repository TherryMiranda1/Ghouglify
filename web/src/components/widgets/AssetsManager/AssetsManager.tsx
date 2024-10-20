import { useState } from "react";
import { ASSETS_FILTERS } from "../../../context/hooks/useAssets";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Button, Card, Header, Input, Section } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { TagsManager } from "../TagsManager/TagsManager";
import { ImageViewer } from "../ImageViewer/ImageViewer";

const EMPTY_DRAFT = {
  name: "",
  description: "",
  type: ASSETS_FILTERS[0],
  image: null,
};

export const AssetsManager = () => {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const {
    assets: { handleCreateAsset },
  } = useGlobalContext();

  const handleSubmit = async () => {
    if (draft.image !== null) {
      const asset = await handleCreateAsset({
        ...draft,
        type: draft.type.id,
      });
      if (asset) {
        setDraft({
          ...draft,
          name: "",
          image: null,
          description: "",
        });
      }
    }
  };
  return (
    <Section>
      <Card>
        <Header text="Sube un asset" componentType="h3" />
        <TagsManager
          data={ASSETS_FILTERS}
          currentTag={draft.type}
          onSelect={(value) => setDraft({ ...draft, type: value })}
        />
        <Input
          placeholder="Nombre"
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e as string })}
        />
        <Input
          placeholder="Descripción"
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e as string })}
        />
        <InputDrop
          onChange={(value) => {
            if (!value) return;
            setDraft({ ...draft, image: value.content });
          }}
        />
        {draft.image && (
          <ImageViewer
            image={draft.image}
            onClose={() => setDraft({ ...draft, image: null })}
          />
        )}
        <Button onClick={handleSubmit}>Subir</Button>
      </Card>
    </Section>
  );
};
