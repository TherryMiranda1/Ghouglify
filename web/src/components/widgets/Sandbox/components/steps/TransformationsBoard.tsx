import styled from "styled-components";
import { useGlobalContext } from "../../../../../context/useGlobalContext";
import { TagsManager } from "../../../TagsManager/TagsManager";
import { TRANSFORMATION_OPTIONS } from "../../../../../context/GlobalContext.constants";
import { TransformationOptions } from "../../../../../context/types";
import { BackgroundGeneration } from "../BackgroundGeneration";
import { BackgroundReplace } from "../BackgroundReplace";
import { FaceSwaping } from "../FaceSwaping";
import { DEVICE_BREAKPOINTS } from "../../../../../constants/devices";

export const TransformationsBoard = () => {
  const {
    sandbox: {
      setCurrentTransformationOption,
      currentTransformationOption,
      setBackgroundReplaceAsset,
      setFaceSwapTargetAsset,
    },
  } = useGlobalContext();

  const handleChangeOption = (option: any) => {
    setCurrentTransformationOption(option);
    setFaceSwapTargetAsset(null);
    setBackgroundReplaceAsset(null);
  };
  return (
    <TransformationsBoardStyled>
      <TagsManager
        variant="COLUMN"
        data={TRANSFORMATION_OPTIONS}
        currentTag={currentTransformationOption}
        onSelect={handleChangeOption}
      />
      <ScrollableListStyled>
        {currentTransformationOption.id ===
          TransformationOptions.BACKGROUND_GENERATION && (
          <BackgroundGeneration />
        )}
        {currentTransformationOption.id ===
          TransformationOptions.BACKGROUND_REPLACE && <BackgroundReplace />}
        {currentTransformationOption.id ===
          TransformationOptions.FACE_SWAPING && <FaceSwaping />}
      </ScrollableListStyled>
    </TransformationsBoardStyled>
  );
};

const TransformationsBoardStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;
const ScrollableListStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  overflow-y: auto;
  max-height: 250px;
  border-radius: var(--small-radius);

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    max-height: 400px;
  }
`;
