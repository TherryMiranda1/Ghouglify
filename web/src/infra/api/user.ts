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

export const updateUserRequest = async ({
  user,
}: {
  user: User;
}): Promise<User | null> => {
  const { _id, ...data } = user;
  const response = await axios.put(`${BASE_API_URL}/users/${_id}`, data);

  return response.data as User;
};