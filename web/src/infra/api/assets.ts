import axios from "axios";
import { BASE_API_URL } from "../Paths";
import { Asset } from "../../types/Asset";

export const createAssetRequest = async ({
  asset,
}: {
  asset: Asset;
}): Promise<Asset | null> => {
  const response = await axios.post(`${BASE_API_URL}/assets`, asset);

  return response.data as Asset;
};

export const getAssetsRequest = async (): Promise<Asset[] | null> => {
  const response = await axios.get(`${BASE_API_URL}/assets`);

  return response.data as Asset[];
};

export const getAssetsByUserIdRequest = async ({
  userId,
}: {
  userId: string;
}): Promise<Asset[] | null> => {
  const response = await axios.get(`${BASE_API_URL}/assets?userId=${userId}`);

  return response.data as Asset[];
};

export const updateAssetRequest = async ({
  asset,
}: {
  asset: Asset;
}): Promise<Asset | null> => {
  const { _id, ...data } = asset;
  const response = await axios.put(`${BASE_API_URL}/assets/${_id}`, data);

  return response.data as Asset;
};

export const deleteAssetRequest = async ({
  asset,
}: {
  asset: Asset;
}): Promise<any> => {
  const response = await axios.delete(`${BASE_API_URL}/assets/${asset._id}`);

  return response.data;
};
