import styled from "styled-components";
import { Asset } from "../../../types/Asset";
import { AssetCard } from "./AssetCard";

interface Props {
  assets: Asset[];
  onSelect?: (asset: Asset) => void;
  selectedItem?: Asset | null;
}

export const AssetsGallery = ({ assets, onSelect, selectedItem }: Props) => {
  return (
    <AssetsGalleryStyled>
      {assets.map((asset) => (
        <AssetCard
          key={asset._id}
          asset={asset}
          onSelect={onSelect}
          selectedItem={selectedItem}
        />
      ))}
    </AssetsGalleryStyled>
  );
};

const AssetsGalleryStyled = styled.section`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
`;
