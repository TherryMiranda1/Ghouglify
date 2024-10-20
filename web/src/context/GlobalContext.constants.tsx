import { IoMdCloudUpload, IoMdImages } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import { ImageSource, TransformationOptions } from "./types";

export const IMAGE_SOURCES = [
  {
    id: ImageSource.LOCAL,
    title: "Subir",
    icon: <IoMdCloudUpload />,
  },
  {
    id: ImageSource.CLOUD,
    title: "Galeria",
    icon: <IoMdImages />,
  },
  {
    id: ImageSource.CAMERA,
    title: "Camara",
    icon: <IoCamera />,
  },
];

export const TRANSFORMATION_OPTIONS = [
  {
    id: TransformationOptions.BACKGROUND_GENERATION,
    title: "Generar fondo",
  },
  {
    id: TransformationOptions.BACKGROUND_REPLACE,
    title: "Reemplazar fondo",
  },
  {
    id: TransformationOptions.FACE_SWAPING,
    title: "Intercambiar rostro",
  },
];
