import { client } from '../helpers/axios';
import {
  TGetMyInfoResponse,
  TLoginRequest,
  TLogoutResponse,
} from '../types/auth';

export const login = async ({ email, password }: TLoginRequest) => {
  const { data } = await client.post(`/api/v1/auth/login`, {
    email,
    password,
  });

  return data;
};

export const logout = async (): Promise<TLogoutResponse> => {
  const { data } = await client.get(`/api/v1/auth/logout`);

  return data;
};

export const getMyInfo = async (): Promise<TGetMyInfoResponse> => {
  const { data } = await client.get(`/api/v1/members/profiles`);

  return data;
};
