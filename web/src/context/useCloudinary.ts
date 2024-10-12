import { useContext } from "react";
import { CloudinaryContext } from "./CloudinaryContext";

export const useCloudinary = () => useContext(CloudinaryContext);
