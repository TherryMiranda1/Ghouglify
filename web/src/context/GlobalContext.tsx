import { createContext } from "react";

import { useImages } from "./hooks/useImages";
import { usePosts } from "./hooks/usePosts";
import { useUser } from "./hooks/useUser";
import { useSandbox } from "./hooks/useSandbox";

import { GlobalReturnType } from "./types";
import { useAssets } from "./hooks/useAssets";

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const GlobalContext = createContext<GlobalReturnType>(
  {} as GlobalReturnType
);

export const GlobalContainer = ({ children }: Props) => {
  const user = useUser();
  const posts = usePosts({ currentUser: user.currentUser });
  const sandbox = useSandbox();
  const image = useImages({ currentUser: user.currentUser, posts, sandbox });
  const assets = useAssets();

  return (
    <GlobalContext.Provider
      value={{
        image,
        user,
        posts,
        sandbox,
        assets
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
