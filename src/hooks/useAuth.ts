import { useEffect } from 'react';
import { getProfile, logout, rotateToken, signIn } from '@apis/auth.ts';
import { queryKeys, storageKeys } from '@constants/keys.ts';
import { numbers } from '@constants/numbers.ts';
import { useMutation, useQuery } from '@tanstack/react-query';
import { removeHeader, setHeader } from '@utils/header.ts';

import type { TUserResponse } from '@/types/auth';
import type { UseMutationCustomOptions, UseQueryCustomOptions } from '@/types/query/common';

import { client } from '@/main';

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    onSettled: () => {
      client.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      client.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    ...mutationOptions,
  });
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<TUserResponse>) {
  return useQuery({
    queryFn: getProfile,
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    ...queryOptions,
  });
}

function useRotateToken() {
  const { data, error, isSuccess, isError, isPending } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: rotateToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });
  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.result.accessToken}`);
      localStorage.setItem(storageKeys.ACCESS_TOKEN, data.result.accessToken);
      localStorage.setItem(storageKeys.REFRESH_TOKEN, data.result.refreshToken);
    }
  }, [isSuccess, data?.result.accessToken, data?.result.refreshToken]);

  useEffect(() => {
    if (isError) {
      removeHeader('Authorization');
      localStorage.removeItem(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError, error, data, isPending };
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      localStorage.removeItem(storageKeys.REFRESH_TOKEN);
      client.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const rotateTokenQuery = useRotateToken();
  const getProfileQuery = useGetProfile({
    enabled: rotateTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const isLoginLoading = getProfileQuery.isPending;
  const logoutMutation = useLogout();

  return { loginMutation, isLogin, isLoginLoading, getProfileQuery, logoutMutation };
}

export default useAuth;
