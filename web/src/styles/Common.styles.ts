import styled from "styled-components";
import { View } from "../components";
import { DEVICE_BREAKPOINTS } from "../constants/devices";

export const GalleryContainer = styled(View)`
  max-width: ${DEVICE_BREAKPOINTS.md};
  box-sizing: border-box;
`;
