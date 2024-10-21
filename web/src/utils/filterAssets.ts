import { AssetFilter } from "../context/types";
import { Asset } from "../types/Asset";

export const filterAssets = (posts: Asset[], filter: AssetFilter) => {
  switch (filter) {
    case AssetFilter.BACKGROUND:
      return posts?.filter((asset) => asset.type === AssetFilter.BACKGROUND);
    case AssetFilter.CHARACTER_FEMALE:
      return posts?.filter(
        (asset) => asset.type === AssetFilter.CHARACTER_FEMALE
      );
    case AssetFilter.CHARACTER_MALE:
      return posts?.filter(
        (asset) => asset.type === AssetFilter.CHARACTER_MALE
      );
    default:
      return posts;
  }
};
