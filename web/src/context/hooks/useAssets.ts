import { useState } from "react";
import { UseAssetsOptions } from "../types";
import { useAsyncCall } from "../../hooks/useAsyncCall";
import { TagTypeBase } from "../../components/widgets/TagsManager/TagsManager";
import {
  createAssetRequest,
  deleteAssetRequest,
  getAssetsRequest,
  updateAssetRequest,
} from "../../infra/api/assets";
import { Asset } from "../../types/Asset";
import { loadImageRequest } from "../../infra/api/images";
import { imageToAsset } from "../../infra/mappers/imageToAsset";

export enum AssetFilter {
  BACKGROUND = "background",
  CHARACTER_MALE = "character_male",
  CHARACTER_FEMALE = "character_female",
}
export interface AssetDraft {
  image: any;
  name: string;
  description: string;
  type: string;
}

export const ASSETS_FILTERS = [
  {
    id: AssetFilter.BACKGROUND,
    title: "Fondos",
  },
  {
    id: AssetFilter.CHARACTER_MALE,
    title: "Personajes Masculinos",
  },
  {
    id: AssetFilter.CHARACTER_FEMALE,
    title: "Personajes Femeninos",
  },
];

export const useAssets = (): UseAssetsOptions => {
  const [currentAssetFilter, setCurrentAssetFilter] = useState<TagTypeBase>(
    ASSETS_FILTERS[0]
  );

  const {
    isError: isAssetsError,
    isLoading: isAssetsLoading,
    data: assetsData,
    call: getAssets,
  } = useAsyncCall(getAssetsRequest);

  const handleDeleteAsset = async (asset: Asset) => {
    const result = await deleteAssetRequest({ asset });
    if (result) {
      handleGetAssets();
    }
  };
  const handleCreateAsset = async ({
    image,
    name,
    description,
    type,
  }: {
    image: string;
    name: string;
    description: string;
    type: string;
  }) => {
    const imageResult = await loadImageRequest(image);

    if (imageResult.data) {
      const mappedAsset = imageToAsset({
        image: imageResult.data,
        name,
        type,
        description,
      });
      const assetResult = await createAssetRequest({ asset: mappedAsset });
      if (assetResult) {
        handleGetAssets();
      }
      return assetResult;
    }
  };

  const handleUpdateAsset = async (asset: Asset) => {
    const result = await updateAssetRequest({ asset });
    if (result) {
      handleGetAssets();
      getAssets();
    }
    return result;
  };

  const handleGetAssets = async (filter = AssetFilter.BACKGROUND) => {
    getAssets({ filter });
  };

  return {
    assets: {
      assetsData,
      getAssets,
      isAssetsError,
      isAssetsLoading,
    },
    currentAssetFilter,
    setCurrentAssetFilter,
    handleDeleteAsset,
    handleCreateAsset,
    handleUpdateAsset,
  };
};
