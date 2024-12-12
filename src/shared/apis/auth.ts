import { client } from '../helpers/axios';
import { TLoginRequest } from '../types/auth';

export const login = async ({ email, password }: TLoginRequest) => {
  const { data } = await client.post(`/api/v1/auth/login`, {
    email,
    password,
  });

  return data.result;
};

export const logout = async () => {
  const { data } = await client.get(`/api/v1/auth/logout`);

  return data.result;
};
