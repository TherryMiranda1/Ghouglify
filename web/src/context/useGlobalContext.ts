import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";

export const useGlobalContext = () => useContext(GlobalContext);
