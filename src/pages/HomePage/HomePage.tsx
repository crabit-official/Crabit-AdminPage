import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../shared/constants/pageRoutes';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='bg-red-100 min-h-screen flex flex-col items-center py-8'>
      <h1 className='text-4xl font-bold mb-8 text-gray-800'>어드민 페이지</h1>

      <div
        className='bg-white p-6 mb-4 w-full max-w-lg rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-300'
        onClick={() => navigate(pageRoutes.academy_register)}
      >
        <h2 className='text-xl font-semibold text-gray-700'>
          기관 신청 리스트 조회
        </h2>
      </div>

      <div
        className='bg-white p-6 mb-4 w-full max-w-lg rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-300'
        onClick={() => navigate(pageRoutes.academy_list)}
      >
        <h2 className='text-xl font-semibold text-gray-700'>
          전체 학원 리스트 조회
        </h2>
      </div>

      <div
        className='bg-white p-6 w-full max-w-lg rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-300'
        onClick={() => navigate(pageRoutes.create_crabit_challenge)}
      >
        <h2 className='text-xl font-semibold text-gray-700'>
          크래빗 챌린지 생성
        </h2>
      </div>
    </div>
  );
}
