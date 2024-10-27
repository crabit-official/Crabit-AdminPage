import axiosInstance from '@apis/axiosInstance';

import type { TRotateTokenResponse, TSignInResponse, TUserResponse } from '@/types/auth';

const signIn = async ({ email, password }: { email: string; password: string }): Promise<TSignInResponse> => {
  const { data } = await axiosInstance.post(`/api/v1/auth/login`, {
    email,
    password,
  });

  return data;
};

const rotateToken = async (): Promise<TRotateTokenResponse> => {
  const { data } = await axiosInstance.get('/api/v1/auth/reissue-token', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
    },
  });

  return data;
};

const getProfile = async (): Promise<TUserResponse> => {
  const { data } = await axiosInstance.get('/api/v1/member/profile');

  return data;
};

const logout = async () => {
  const { data } = await axiosInstance.get('/api/v1/auth/logout');

  return data;
};

export { getProfile, logout, rotateToken, signIn };
