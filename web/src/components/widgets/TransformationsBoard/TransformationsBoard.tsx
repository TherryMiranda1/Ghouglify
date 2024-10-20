import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";
import { TRANSFORMATION_OPTIONS } from "../../../context/GlobalContext.constants";
import { TransformationOptions } from "../../../context/types";
import { BackgroundGeneration } from "./components/BackgroundGeneration";
import { BackgroundReplace } from "./components/BackgroundReplace";
import { FaceSwaping } from "./components/FaceSwaping";

export const TransformationsBoard = () => {
  const {
    sandbox: { setCurrentTransformationOption, currentTransformationOption },
  } = useGlobalContext();
  return (
    <TransformationsBoardStyled>
      <TagsManager
        data={TRANSFORMATION_OPTIONS}
        currentTag={currentTransformationOption}
        onSelect={setCurrentTransformationOption}
      />
      {currentTransformationOption.id ===
        TransformationOptions.BACKGROUND_GENERATION && <BackgroundGeneration />}
      {currentTransformationOption.id ===
        TransformationOptions.BACKGROUND_REPLACE && <BackgroundReplace />}
      {currentTransformationOption.id ===
        TransformationOptions.FACE_SWAPING && <FaceSwaping />}
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
