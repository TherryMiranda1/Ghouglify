import { useState } from "react";
import { User } from "../../types/User";
import { UseUserOptions } from "../types";
import { useOnboardingUser } from "../../hooks/useOnboardingUser";
import { loadImageRequest } from "../../infra/api/images";
import { updateUserRequest } from "../../infra/api/user";

export const useUser = (): UseUserOptions => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useOnboardingUser({ currentUser, onSuccess: (user) => setCurrentUser(user) });

  const handleUpdateUser = async ({
    image,
    name,
  }: {
    image: string;
    name: string;
  }) => {
    const imageResult = await loadImageRequest(image);

    if (imageResult.data && currentUser) {
      const userResult = await updateUserRequest({
        user: { ...currentUser, profileImage: imageResult.data, name },
      });

      return userResult;
    }
  };

  return {
    currentUser,
    setCurrentUser,
    handleUpdateUser,
  };
};
