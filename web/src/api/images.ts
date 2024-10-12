import axios from "axios";
import { cloudinaryConfig } from "../config/cloudinary";

export const loadImageRequest = async (image: string) => {
  const { uploadPreset, cloudinaryUrl } = cloudinaryConfig;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", uploadPreset);

  const response = await axios.post(cloudinaryUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};
