import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@hooks/AuthProvider.tsx';
import useAuth from '@hooks/useAuth.ts';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isLogin } = useAuth();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { replace: true });
    }
  }, [navigate, isLogin, isAuthenticated]);

  return <>{children}</>;
}

export default PrivateRoute;
