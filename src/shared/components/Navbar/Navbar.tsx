import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/auth/useAuth';

export default function Navbar() {
  const { useGetMyInfo, logoutMutation } = useAuth();
  const { data: profile } = useGetMyInfo();
  const navigate = useNavigate();

  return (
    <nav className='bg-gray-800 text-white py-4 px-6'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Logo Section */}
        <div className='text-2xl font-bold'>
          <a href='/' className='hover:text-gray-300 transition duration-200'>
            MyApp
          </a>
        </div>

        {/* User Info & Button Section */}
        <div className='flex items-center gap-4'>
          {/* Display name if logged in */}
          {profile?.result ? (
            <>
              <div className='flex items-center gap-2'>
                <img
                  src={profile.result.profileImageUrl || '/default-profile.png'}
                  alt='Profile'
                  className='w-10 h-10 rounded-full border border-gray-500'
                />
                <span className='font-medium'>
                  {profile.result.name || '사용자'}님 환영합니다.
                </span>
              </div>
              <button
                className='bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200'
                onClick={() =>
                  logoutMutation.mutate(
                    {},
                    {
                      onSuccess: () => navigate('/login'),
                    }
                  )
                }
              >
                로그아웃
              </button>
            </>
          ) : (
            <button
              className='bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200'
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
