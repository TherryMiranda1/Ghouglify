import styled from "styled-components";
import { Asset } from "../../../types/Asset";
import { Header } from "../../ui";

interface Props {
  asset: Asset;
  onSelect?: (asset: Asset) => void;
  selectedItem?: Asset | null;
}

export const AssetCard = ({ asset, onSelect, selectedItem }: Props) => {
  const isSelected = selectedItem?._id === asset._id;

  return (
    <AssetCardStyled onClick={() => onSelect?.(asset)} $isSelected={isSelected}>
      <ContentStyled>
        <Header componentType="h4" text={asset.name} />
      </ContentStyled>
      <AssetCardImageStyled src={asset.originalImageUrl} />
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
const AssetCardImageStyled = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  object-position: top;
  border: var(--border);
`;

const ContentStyled = styled.section`
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
`;
