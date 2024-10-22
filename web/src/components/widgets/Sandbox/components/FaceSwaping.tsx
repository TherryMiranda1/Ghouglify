import { useState } from "react";
import { AssetFilter } from "../../../../context/types";
import { useGlobalContext } from "../../../../context/useGlobalContext";
import { AssetsView } from "../../../../Views/Assets";
import { Card } from "../../../ui";
import { TagsManager, TagTypeBase } from "../../TagsManager/TagsManager";
import { ASSETS_FILTERS } from "../../../../context/GlobalContext.constants";

export const FaceSwaping = () => {
  const { sandbox } = useGlobalContext();
  const [currentAssetFilter, setCurrentAssetFilter] = useState<TagTypeBase>(
    ASSETS_FILTERS[1]
  );
  return (
    <Card>
      <TagsManager
        data={[ASSETS_FILTERS[1], ASSETS_FILTERS[2]]}
        currentTag={currentAssetFilter}
        onSelect={(item: TagTypeBase) => setCurrentAssetFilter(item)}
      />
      <AssetsView
        selectedItem={sandbox.faceSwapTargetAsset}
        onSelect={(asset) => sandbox.setFaceSwapTargetAsset(asset)}
        filterBy={currentAssetFilter.id as AssetFilter}
      />
    </Card>
  );
};
