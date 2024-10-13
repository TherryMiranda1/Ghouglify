import styled from "styled-components";
import { GrPowerCycle } from "react-icons/gr";
import { IoMdShareAlt } from "react-icons/io";
import { MdDelete, MdDownload } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

import { Button } from "./../../ui/button/Button";
import { ICON_SIZES } from "../../../constants/sizes";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { Post } from "../../../types/Post";

interface Props {
  post: Post;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export const OptionsToggle = ({ post, isOpen, onOpen, onClose }: Props) => {
  const {
    posts: { handleDeletePost },
  } = useGlobalContext();

  return (
    <OptionsToggleStyled>
      {isOpen ? (
        <ContentStyled>
          <OptionStyled onClick={() => onClose?.()}>
            Remix <GrPowerCycle size={ICON_SIZES.xs} />
          </OptionStyled>
          <OptionStyled onClick={() => onClose?.()}>
            Share <IoMdShareAlt size={ICON_SIZES.xs} />
          </OptionStyled>
          <OptionStyled onClick={() => onClose?.()}>
            Download <MdDownload size={ICON_SIZES.xs} />
          </OptionStyled>
          <OptionStyled
            onClick={() => {
              onClose?.();
              handleDeletePost(post);
            }}
          >
            Delete <MdDelete size={ICON_SIZES.xs} />
          </OptionStyled>
        </ContentStyled>
      ) : (
        <ButtonStyled onClick={() => onOpen?.()}>
          <CiMenuKebab size={ICON_SIZES.sm} />
        </ButtonStyled>
      )}
    </OptionsToggleStyled>
  );
};

const OptionsToggleStyled = styled.section`
  z-index: 2;
  position: absolute;
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

const ContentStyled = styled.section`
  background-color: var(--background-transparent-color);
  border: var(--border);
  padding: 8px;
  gap: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--small-radius);
`;

const OptionStyled = styled.button`
  background-color: transparent;
  border: var(--border);
  padding: 6px 8px;
  display: flex;
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
