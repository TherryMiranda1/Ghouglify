import { useState } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Button, Header, Input, Section } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { updateUserRequest } from "../../../infra/api/user";

const EMPTY_DRAFT = {
  name: "",
  profileImage: undefined,
};

export const UserManager = () => {
  const {
    user: { currentUser, setCurrentUser },
  } = useGlobalContext();
  const [draft, setDraft] = useState(
    currentUser
      ? {
          name: currentUser.name,
          profileImage: currentUser.profileImage,
        }
      : EMPTY_DRAFT
  );
  const handleSubmit = async () => {
    if (currentUser?.userUUID) {
      const userDraft = {
        ...currentUser,
        ...draft,
      };
      const result = await updateUserRequest({
        user: userDraft,
      });
      if (result) {
        setDraft({
          name: result.name,
          profileImage: result.profileImage,
        });
        setCurrentUser(result);
      }
    }
  };
  return (
    <Section>
      <Header text={`Hola ${currentUser?.name}`} componentType="h3" />

      <Header text="Foto de perfil" componentType="h4" />

      {draft.profileImage ? (
        <ImageViewer
          image={draft.profileImage}
          onClose={() => setDraft({ ...draft, profileImage: undefined })}
        />
      ) : (
        <InputDrop
          onChange={(value) => {
            if (!value) return;
            setDraft({ ...draft, profileImage: value.content });
          }}
        />
      )}
      <Header text="Username" componentType="h4" />
      <Input
        placeholder="Nombre"
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e as string })}
      />
      <Button onClick={handleSubmit}>Actualizar</Button>
    </Section>
  );
};
