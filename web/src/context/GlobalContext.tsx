import { createContext } from "react";

import { useImages } from "./hooks/useImages";
import { usePosts } from "./hooks/usePosts";
import { useUser } from "./hooks/useUser";
import { useSandbox } from "./hooks/useSandbox";

import { GlobalReturnType } from "./types";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GlobalContext = createContext<GlobalReturnType>(
  {} as GlobalReturnType
);

export const GlobalContainer = ({ children }: Props) => {
  const user = useUser();
  const posts = usePosts({ currentUser: user.currentUser });
  const image = useImages({ currentUser: user.currentUser, posts });
  const sandbox = useSandbox();

  return (
    <GlobalContext.Provider
      value={{
        image,
        user,
        posts,
        sandbox,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
