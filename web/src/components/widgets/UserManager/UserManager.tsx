import { useState } from "react";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Button, Header, Input } from "../../ui";
import { InputDrop } from "../InputDrop/InputDrop";
import { ImageViewer } from "../ImageViewer/ImageViewer";
import { updateUserRequest } from "../../../infra/api/user";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { PumpkingCorner } from "../../ui/decorations/PumpkinCorner";

const EMPTY_DRAFT = {
  name: "",
  profileImage: undefined,
};

export const UserManager = () => {
  const [isEdit, setIsEdit] = useState(false);
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
        setIsEdit(false);
      }
    }
  };
  return (
    <UserManagerStyled>
      <PumpkingCorner />
      {isEdit ? (
        <>
          {" "}
          <Header text="Foto de perfil" componentType="h4" />
          {draft.profileImage ? (
            <ImageViewer
              image={draft.profileImage}
              onClose={() => setDraft({ ...draft, profileImage: undefined })}
            />
          ) : (
            <InputDrop
              height={200}
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
        </>
      ) : (
        <>
          <Header text={` ${currentUser?.name}`} componentType="h3" />
          {currentUser?.profileImage && (
            <ProfilePictureStyled
              src={currentUser.profileImage}
              alt="profile"
            />
          )}
        </>
      )}

      <Button onClick={() => (isEdit ? handleSubmit() : setIsEdit(true))}>
        {isEdit ? "Actualizar" : "Editar"}
      </Button>
      {isEdit && <Button onClick={() => setIsEdit(false)}>Cancelar</Button>}
    </UserManagerStyled>
  );
};

const ProfilePictureStyled = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: var(--card-radius);
  overflow: hidden;
  margin-bottom: 16px;
`;

const UserManagerStyled = styled.section`
  position: relative;
  background-color: var(--background-transparent-color);
  border: var(--border);
  border-radius: var(--card-radius);
  padding: 16px;
  gap: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  max-width: ${DEVICE_BREAKPOINTS.xs};
  margin: auto;
`;
