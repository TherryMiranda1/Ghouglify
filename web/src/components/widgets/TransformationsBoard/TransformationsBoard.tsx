import styled from "styled-components";
import { useGlobalContext } from "../../../context/useGlobalContext";
import { TagsManager } from "../TagsManager/TagsManager";
import { TRANSFORMATION_OPTIONS } from "../../../context/GlobalContext.constants";
import { TransformationOptions } from "../../../context/types";
import { BackgroundGeneration } from "./components/BackgroundGeneration";
import { BackgroundReplace } from "./components/BackgroundReplace";
import { FaceSwaping } from "./components/FaceSwaping";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

export const TransformationsBoard = () => {
  const {
    sandbox: { setCurrentTransformationOption, currentTransformationOption },
  } = useGlobalContext();
  return (
    <TransformationsBoardStyled>
      <TagsManager
        variant="COLUMN"
        data={TRANSFORMATION_OPTIONS}
        currentTag={currentTransformationOption}
        onSelect={setCurrentTransformationOption}
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

  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    width: 50%;
    max-height: 80vh;
    overflow-y: auto;
  }
`;
const ScrollableListStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  max-height: 35vh;
  overflow-y: auto;
  border-radius: var(--small-radius);
  @media screen and (min-width: ${DEVICE_BREAKPOINTS.lg}) {
    max-height: 60vh;
  }
`;
