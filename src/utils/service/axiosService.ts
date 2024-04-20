import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ICommonResponse, IUser } from "../types/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const axiosClient = axios.create({
  baseURL: baseUrl,
});

axiosClient.interceptors.request.use((config) => {
  const getUser: string | null = sessionStorage.getItem("user");
  if (getUser) {
    const parseUser: IUser = JSON.parse(getUser);
    config.headers.Authorization = `Bearer ${parseUser?.token}`;
  }
  return config;
});

export const GET = async <T = any>(
  endPoint: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<ICommonResponse<T>, any>> => {
  const response = await axiosClient.get(endPoint, {
    ...config,
  });
  return response;
};
