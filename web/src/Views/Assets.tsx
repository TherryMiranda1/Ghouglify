import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { GalleryContainer } from "../styles/Common.styles";
import { AssetsGallery } from "../components/widgets/AssetsGallery/AssetsGallery";
import { Asset } from "../types/Asset";
import { AssetFilter } from "../context/types";
import { filterAssets } from "../utils/filterAssets";

interface Props {
  onSelect?: (item: Asset) => void;
  selectedItem?: Asset | null;
  filterBy?: AssetFilter;
}

export const AssetsView = ({
  onSelect,
  selectedItem,
  filterBy = AssetFilter.BACKGROUND,
}: Props) => {
  const {
    assets: {
      assets: { assetsData, getAssets, isAssetsLoading, isAssetsError },
    },
  } = useGlobalContext();

  useEffect(() => {
    if (!assetsData) {
      getAssets();
    }
  }, [assetsData]);

  const filteredAssets = assetsData ? filterAssets(assetsData, filterBy) : [];

  if (isAssetsLoading) {
    return <LoadingState />;
  }

  if (isAssetsError) {
    return <View>Error</View>;
  }

  if (filteredAssets?.length === 0) {
    return <View>No hay assets</View>;
  }

  return (
    <GalleryContainer>
      {filteredAssets && (
        <AssetsGallery
          assets={filteredAssets}
          selectedItem={selectedItem}
          onSelect={onSelect}
        />
      )}
    </GalleryContainer>
  );
};
