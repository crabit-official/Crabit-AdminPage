import { Link } from 'react-router-dom';
import useAuth from '@hooks/useAuth.ts';
import ListRow from '@shared/ListRow.tsx';
import Spacing from '@shared/Spacing.tsx';
import Top from '@shared/Top.tsx';

function HomePage() {
  const { getProfileQuery } = useAuth();
  const { data } = getProfileQuery;

  return (
    <div>
      <Top title={`${data?.result.name}님 환영합니다.`} subTitle={'회원들을 관리해보세요'} />
      <ul>
        <li>
          <Link to={'/member'}>
            <ListRow as="div" contents={<ListRow.Texts title="회원 조회" subTitle="크래빗 회원의 전체 멤버를 조회합니다." />} withArrow />
          </Link>
        </li>
        <Spacing size={16} />
        <li>
          <Link to={'/academy'}>
            <ListRow
              as="div"
              contents={<ListRow.Texts title="학원 신청 리스트 조회" subTitle="크래빗 서비스를 이용하기 위하여, 가입한 학원들을 처리합니다." />}
              withArrow
            />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
