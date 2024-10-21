import axios from "axios";
import { FACE_SWAP_SERVICE_URL, REMOVE_BACKGROUND_SERVICE_URL } from "../Paths";

export const faceSwapRequest = async (body: {
  source_face_url: string;
  target_url: string;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${FACE_SWAP_SERVICE_URL}/swap-faces/`,
      body,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
        },
      }
    );
    const blob = await response.data;
    const file = new File([blob], `ghougly-swap${new Date()}.jpg`, {
      type: "image/jpeg",
    });

    return file;
  } catch (error) {
    console.error(error);
  }
};

export const removeBackgroundRequest = async (body: {
  url: string;
}): Promise<any> => {
  try {
    const response = await axios.post(
      `${REMOVE_BACKGROUND_SERVICE_URL}/remove-background/`,
      body,
      {
        responseType: "blob",
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
          Connection: "keep-alive",
        },
      }
    );
    const blob = await response.data;
    const file = new File([blob], `ghougly-remove${new Date()}.jpg`, {
      type: "image/jpeg",
    });

    return file;
  } catch (error) {
    console.error(error);
  }
};
