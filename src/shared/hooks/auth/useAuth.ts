import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyInfo, login, logout } from '../../apis/auth';
import { UseMutationCustomOptions } from '../../types/common';
import { queryClient } from '../../../main';

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
    throwOnError: true,
    ...mutationOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (error) => console.log(error),
    throwOnError: true,
    ...mutationOptions,
  });
}

function useGetMyInfo() {
  return useQuery({
    queryFn: getMyInfo,
    queryKey: ['me'],
    throwOnError: true,
  });
}

function useAuth() {
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return { loginMutation, logoutMutation, useGetMyInfo };
}

export default useAuth;
