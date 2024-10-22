import { FaPlus, FaRegHeart, FaUserAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { LuGalleryVerticalEnd } from "react-icons/lu";

export const NAVIGATION_OPTIONS = [
  { title: "Muro", path: "/", icon: <GoHome /> },
  { title: "Galeria", path: "/gallery", icon: <LuGalleryVerticalEnd /> },
  { title: "Crear", path: "/create", icon: <FaPlus />, isMainOption: true },
  { title: "Info", path: "/about", icon: <FaRegHeart /> },
  { title: "Perfil", path: "/me", icon: <FaUserAlt /> },
];
