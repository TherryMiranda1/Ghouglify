import axios from "axios";
import { User } from "../types/User";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const connectUserRequest = async ({
  userUUID,
  name,
}: {
  userUUID?: string;
  name?: string;
}): Promise<User | null> => {
  const response = await axios.post(`${BASE_API_URL}/users`, {
    userUUID,
    name,
  });

  console.log(response);
  return response.data as User;
};
