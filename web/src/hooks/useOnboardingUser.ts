import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { connectUserRequest } from "../infra/api/user";
import { User } from "../types/User";

interface Props {
  currentUser: User | null;
  onSuccess: (params: any) => void;
  onError?: (err: any) => void;
}

export const useOnboardingUser = ({
  currentUser,
  onSuccess,
  onError,
}: Props) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initializeUser = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const storedUuid = localStorage.getItem("uuid");

      if (storedUuid) {
        // Usuario existente
        const existingUser = await connectUserRequest({ userUUID: storedUuid });
        if (existingUser) {
          onSuccess(existingUser);
        }
      } else {
        // Nuevo usuario: generar UUID y nombre aleatorio
        const newUuid = uuidv4();
        const randomName = `Ghougly-${newUuid.slice(0, 3)}`;

        const newUser = await connectUserRequest({
          userUUID: newUuid,
          name: randomName,
        });
        if (newUser) {
          localStorage.setItem("uuid", newUser.userUUID);
          onSuccess(newUser);
        }
      }
    } catch (err) {
      console.error(err);
      setIsError(true);
      onError?.(err);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!currentUser) {
      initializeUser();
    }
  }, [currentUser]);

  return { isError, isLoading };
};
