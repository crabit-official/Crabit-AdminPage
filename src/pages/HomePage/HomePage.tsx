import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../../shared/constants/pageRoutes';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='bg-red-100 w-full h-full'>
      <div
        className='flex flex-col'
        onClick={() => navigate(pageRoutes.academy_register)}
      >
        기관 신청 리스트 조회
      </div>
      <div
        className='flex flex-col'
        onClick={() => navigate(pageRoutes.academy_list)}
      >
        전체 학원 리스트 조회
      </div>
    </div>
  );
}
