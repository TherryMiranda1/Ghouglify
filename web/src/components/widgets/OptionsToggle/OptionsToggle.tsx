import styled from "styled-components";
import { GrPowerCycle } from "react-icons/gr";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdDownload } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

import { Button } from "./../../ui/button/Button";
import { ICON_SIZES } from "../../../constants/sizes";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Post } from "../../../types/Post";
import { useDownloadImage } from "../../../hooks/useDownloadImage";
import { TRANSFORMATION_OPTIONS } from "../../../context/GlobalContext.constants";
import { useRouter } from "@tanstack/react-router";
import { useShareImage } from "../../../hooks/useShareImage";
import { FaShareAlt } from "react-icons/fa";

interface Props {
  variant?: "ROW" | "COLUMN";
  post: Post;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  showTransformation?: boolean;
}

export const OptionsToggle = ({
  variant = "COLUMN",
  post,
  isOpen,
  onOpen,
  onClose,
}: Props) => {
  const { handleDownload } = useDownloadImage();
  const { navigate } = useRouter();
  const {
    sandbox: {
      setCurrentPrompt,
      setFaceSwapTargetAsset,
      setBackgroundReplaceAsset,
      setCurrentTransformationOption,
    },
    posts: { handleDeletePost, handleUpdatePost },
    user: { currentUser },
  } = useGlobalContext();

  const imageUrl =
    post.isTransformation && post.transformedImageUrl
      ? post.transformedImageUrl
      : post.originalImageUrl;

  const isOwner = post.userId === currentUser?.userUUID;
  const hasTransformation = post.transformedImageUrl;
  const { shareImage, isSharingSupported } = useShareImage(imageUrl);

  const handleRemix = () => {
    if (post.facePrompt) {
      setCurrentTransformationOption(TRANSFORMATION_OPTIONS[2]);
      setFaceSwapTargetAsset({
        name: "",
        type: "",
        originalImageUrl: post.facePrompt,
      });
    }

    if (post.objectsPrompt) {
      setCurrentTransformationOption(TRANSFORMATION_OPTIONS[1]);
      setBackgroundReplaceAsset({
        name: "",
        type: "",
        originalImageUrl: post.objectsPrompt,
      });
    }
    if (post.backgroundPrompt) {
      setCurrentTransformationOption(TRANSFORMATION_OPTIONS[0]);
      setCurrentPrompt(post.backgroundPrompt);
    }

    navigate({ to: "/create" });
  };
  return (
    <OptionsToggleStyled $variant={variant}>
      {isOpen ? (
        <ContentStyled $variant={variant}>
          {hasTransformation && (
            <OptionStyled
              $variant={variant}
              onClick={() => {
                onClose?.();
                handleRemix();
              }}
            >
              Remix <GrPowerCycle size={ICON_SIZES.xs} />
            </OptionStyled>
          )}
          {!post.isPublic && (
            <OptionStyled
              $variant={variant}
              onClick={() => {
                handleUpdatePost({ ...post, isPublic: true });
                onClose?.();
              }}
            >
              Publicar <IoMdShareAlt size={ICON_SIZES.xs} />
            </OptionStyled>
          )}
          {isSharingSupported && (
            <OptionStyled
              $variant={variant}
              onClick={() => {
                shareImage();
                onClose?.();
              }}
            >
              Compartir <FaShareAlt size={ICON_SIZES.xs} />
            </OptionStyled>
          )}
          <OptionStyled
            $variant={variant}
            onClick={() => {
              console.log(post);
              handleDownload(imageUrl, post.name);
              onClose?.();
            }}
          >
            Descargar <MdDownload size={ICON_SIZES.xs} />
          </OptionStyled>
          {isOwner && (
            <OptionStyled
              $variant={variant}
              onClick={() => {
                onClose?.();
                handleDeletePost(post);
              }}
            >
              Eliminar <MdDelete size={ICON_SIZES.xs} />
            </OptionStyled>
          )}
        </ContentStyled>
      ) : (
        <ButtonStyled onClick={() => onOpen?.()}>
          <CiMenuKebab size={ICON_SIZES.sm} />
        </ButtonStyled>
      )}
    </OptionsToggleStyled>
  );
};

const OptionsToggleStyled = styled.section<{ $variant?: "ROW" | "COLUMN" }>`
  z-index: 5;
  position: ${({ $variant }) => ($variant === "ROW" ? "relative" : "absolute")};
  bottom: 4px;
  right: 4px;
`;

const ButtonStyled = styled(Button)`
  background-color: var(--background-transparent-color);
  border: var(--border);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--small-radius);
`;

const ContentStyled = styled.section<{ $variant?: "ROW" | "COLUMN" }>`
  background-color: var(--background-transparent-color);
  border: var(--border);
  padding: 8px;
  gap: 2px;
  display: flex;
  flex-direction: ${({ $variant }) => ($variant === "ROW" ? "row" : "column")};
  align-items: center;
  justify-content: center;
  border-radius: var(--small-radius);
`;

const OptionStyled = styled.button<{ $variant?: "ROW" | "COLUMN" }>`
  background-color: transparent;
  padding: 6px 8px;
  display: flex;
  flex-direction: ${({ $variant }) =>
    $variant === "ROW" ? "column-reverse" : "row"};
  gap: 4px;
  font-size: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: var(--small-radius);

  &:hover {
    background-color: var(--background-color);
  }
`;
