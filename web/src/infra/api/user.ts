import axios from "axios";
import { User } from "../../types/User";
import { BASE_API_URL } from "../Paths";

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

  return response.data as User;
};
