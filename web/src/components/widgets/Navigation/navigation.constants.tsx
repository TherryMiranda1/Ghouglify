import { FaPlus, FaRegHeart, FaUserAlt } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { LuGalleryVerticalEnd } from "react-icons/lu";

export const NAVIGATION_OPTIONS = [
  { title: "Home", path: "/", icon: <GoHome /> },
  { title: "Gallery", path: "/gallery", icon: <LuGalleryVerticalEnd /> },
  { title: "Create", path: "/create", icon: <FaPlus />, isMainOption: true },
  { title: "About", path: "/about", icon: <FaRegHeart /> },
  { title: "Me", path: "/me", icon: <FaUserAlt /> },
];
