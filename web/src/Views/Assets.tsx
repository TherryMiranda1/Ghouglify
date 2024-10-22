import { useEffect } from "react";
import { EmptyState, LoadingState, View } from "../components";
import { useGlobalContext } from "../context/useGlobalContext";
import { GalleryContainer } from "../styles/Common.styles";
import { AssetsGallery } from "../components/widgets/AssetsGallery/AssetsGallery";
import { Asset } from "../types/Asset";
import { AssetFilter } from "../context/types";
import { filterAssets } from "../utils/filterAssets";
import { IMAGES } from "../assets/images";
import { useRouter } from "@tanstack/react-router";

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
  const { navigate } = useRouter();
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
    return (
      <View>
        <EmptyState
          title="Algo ha salido mal"
          description="Parece que la suerte no esta de nuestro lado..."
          image={IMAGES.empty}
          buttonText="reintentar"
          buttonOnClick={() => getAssets()}
        />
      </View>
    );
  }

  if (filteredAssets?.length === 0) {
    return (
      <View>
        <EmptyState
          title="Esto esta muy vacio"
          image={IMAGES.empty}
          buttonText="Subir un asset"
          buttonOnClick={() => navigate({ to: "/assets" })}
        />
      </View>
    );
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
