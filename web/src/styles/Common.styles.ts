import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../constants/devices";

export const GalleryContainer = styled.section`
  position: relative;
  max-width: ${DEVICE_BREAKPOINTS.md};
  margin: auto;
  box-sizing: border-box;
`;
