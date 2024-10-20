import { useEffect } from "react";
import { LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { GalleryContainer } from "../styles/Common.styles";
import { AssetsGallery } from "../components/widgets/AssetsGallery/AssetsGallery";
import { Asset } from "../types/Asset";

interface Props {
  onSelect?: (item: Asset) => void;
  selectedItem?: Asset | null;
}

export const AssetsView = ({ onSelect, selectedItem }: Props) => {
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

  if (isAssetsLoading) {
    return <LoadingState />;
  }

  if (isAssetsError) {
    return <View>Error</View>;
  }

  if (assetsData?.length === 0) {
    return <View>No hay assets</View>;
  }

  return (
    <GalleryContainer>
      {assetsData && (
        <AssetsGallery
          assets={assetsData}
          selectedItem={selectedItem}
          onSelect={onSelect}
        />
      )}
    </GalleryContainer>
  );
};
