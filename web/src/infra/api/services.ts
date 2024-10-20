import axios from "axios";
import { FACE_SWAP_SERVICE_URL } from "../Paths";

export const faceSwapRequest = async ({
  source_face_url,
  target_url,
}: {
  source_face_url: string;
  target_url: string;
}): Promise<any> => {
  const response = await axios.post(
    `${FACE_SWAP_SERVICE_URL}/swap-faces`,
    {
      source_face_url,
      target_url,
    },
  );

  return response;
};
