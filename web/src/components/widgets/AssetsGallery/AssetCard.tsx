import styled from "styled-components";
import { Asset } from "../../../types/Asset";
import { Header } from "../../ui";
import { truncateText } from './../../../utils/truncateText';

interface Props {
  asset: Asset;
  onSelect?: (asset: Asset) => void;
  selectedItem?: Asset | null;
}



export const AssetCard = ({ asset, onSelect, selectedItem }: Props) => {
  const assetSelected = selectedItem?._id === asset._id;
  const promptSelected = selectedItem?.name === asset.name;
  const isPrompt = asset.type === "prompt";

  const isSelected = isPrompt ? promptSelected : assetSelected;

  return (
    <AssetCardStyled onClick={() => onSelect?.(asset)} $isSelected={isSelected}>
      <ContentStyled $isPrompt={isPrompt}>
        <Header componentType="h4" text={truncateText(asset.name)} />
      </ContentStyled>
      <AssetCardImageStyled src={asset.originalImageUrl} $isPrompt={isPrompt} />
    </AssetCardStyled>
  );
};

const AssetCardStyled = styled.button<{ $isSelected: boolean }>`
  position: relative;
  box-sizing: border-box;
  padding: 0px;
  border-radius: var(--card-radius);
  border: ${({ $isSelected }) =>
    $isSelected ? "2px solid var(--tint-color)" : "var(--border)"};
  width: calc((100% - 4px) / 2);
  aspect-ratio: 16/9;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
`;
const AssetCardImageStyled = styled.img<{ $isPrompt?: boolean }>`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: ${(props) => (props.$isPrompt ? "center" : "top")};
  border: var(--border);
`;

const ContentStyled = styled.section<{ $isPrompt?: boolean }>`
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: flex-end;
  padding: 8px;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  color: var(--text-color);
  border-radius: var(--card-radius);
  font-size: ${(props) => (props.$isPrompt ? "12px" : "14px")};
`;
