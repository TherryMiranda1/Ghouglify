import { IoMdCloudUpload, IoMdImages } from "react-icons/io";
import { IoCamera, IoSwapHorizontalSharp } from "react-icons/io5";
import { AssetFilter, ImageSource, TransformationOptions } from "./types";
import { FaMagic } from "react-icons/fa";
import { PiSelectionBackground } from "react-icons/pi";

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
    icon: <FaMagic />,
  },
  {
    id: TransformationOptions.BACKGROUND_REPLACE,
    title: "Reemplazar fondo",
    icon: <PiSelectionBackground />,
  },
  {
    id: TransformationOptions.FACE_SWAPING,
    title: "Intercambiar rostro",
    icon: <IoSwapHorizontalSharp />,
  },
];

export const ASSETS_FILTERS = [
  {
    id: AssetFilter.BACKGROUND,
    title: "Fondos",
  },
  {
    id: AssetFilter.CHARACTER_MALE,
    title: "Masculinos",
  },
  {
    id: AssetFilter.CHARACTER_FEMALE,
    title: "Femeninos",
  },
];
