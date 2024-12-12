import { useMutation } from '@tanstack/react-query';
import { login } from '../../apis/auth';

function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
    throwOnError: true,
  });
}

function useAuth() {
  const loginMutation = useLogin();

  return { loginMutation };
}

export default useAuth;
