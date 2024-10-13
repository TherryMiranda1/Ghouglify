import { useState } from "react";
import { User } from "../../types/User";
import { UseUserOptions } from "../types";
import { useOnboardingUser } from "../../hooks/useOnboardingUser";

export const useUser = (): UseUserOptions => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useOnboardingUser({ currentUser, onSuccess: (user) => setCurrentUser(user) });

  return {
    currentUser,
    setCurrentUser,
  };
};
