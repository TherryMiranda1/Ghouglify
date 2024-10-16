import axios from "axios";
import { BASE_API_URL } from "../Paths";
import { Post } from "../../types/Post";

export const createPostRequest = async ({
  post,
}: {
  post: Post;
}): Promise<Post | null> => {
  const response = await axios.post(`${BASE_API_URL}/posts`, post);

  return response.data as Post;
};

export const getPostsRequest = async (): Promise<Post[] | null> => {
  const response = await axios.get(`${BASE_API_URL}/posts`);

  return response.data as Post[];
};

export const getPostsByUserIdRequest = async ({
  userId,
}: {
  userId: string;
}): Promise<Post[] | null> => {
  const response = await axios.get(`${BASE_API_URL}/posts?userId=${userId}`);

  return response.data as Post[];
};

export const updatePostRequest = async ({
  post,
}: {
  post: Post;
}): Promise<Post | null> => {
  const { _id, ...data } = post;
  const response = await axios.put(`${BASE_API_URL}/posts/${_id}`, data);

  return response.data as Post;
};

export const deletePostRequest = async ({
  post,
}: {
  post: Post;
}): Promise<any> => {
  const response = await axios.delete(`${BASE_API_URL}/posts/${post._id}`);

  return response.data;
};
