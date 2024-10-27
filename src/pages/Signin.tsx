import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { TFormValues } from '@components/signin/Form';
import Form from '@components/signin/Form';
import { useUser } from '@hooks/AuthProvider.tsx';
import useAuth from '@hooks/useAuth.ts';

function SigninPage() {
  const { loginMutation } = useAuth();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUser();

  const handleSubmit = useCallback(
    (formValues: TFormValues) => {
      loginMutation.mutate(
        {
          email: formValues.email,
          password: formValues.password,
        },
        {
          onSuccess: (data) => {
            setUser({
              name: data.result.name,
              globalRole: data.result.globalRole,
              profileImageUrl: data.result.profileImageUrl,
              accessToken: data.result.accessToken,
              socialType: data.result.socialType,
              refreshToken: data.result.refreshToken,
            });
            setIsAuthenticated(true);
            navigate('/');
          },
          onError: () => {
            setUser(null);
          },
        },
      );
    },
    [loginMutation, navigate, setIsAuthenticated, setUser],
  );

  return <Form onSubmit={handleSubmit} />;
}
export default SigninPage;
