import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useUser } from '@hooks/AuthProvider.tsx';
import useAuth from '@hooks/useAuth.ts';
import Button from '@shared/Button.tsx';
import Flex from '@shared/Flex.tsx';
import { colors } from '@styles/colorPalette.ts';

function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useUser();
  const { logoutMutation } = useAuth();

  const navigate = useNavigate();

  return (
    <Flex justify="space-between" align="center" css={navbarContainer}>
      <Link to="/">
        <img src="/images/logo.png" width={75} height={75} alt="크래빗 로고" />
      </Link>
      {isAuthenticated ? (
        <Button
          onClick={() => {
            logoutMutation.mutate(null);
            setIsAuthenticated(false);
          }}
        >
          로그아웃
        </Button>
      ) : (
        <Button
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </Button>
      )}
    </Flex>
  );
}

const navbarContainer = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border-bottom: 1px solid ${colors.gray};
`;

export default Navbar;
