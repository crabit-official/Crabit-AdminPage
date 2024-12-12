import { useInView } from 'react-intersection-observer';
import useGetAcademyList from '../../shared/hooks/admin/useGetAcademyList';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AcademyListPage() {
  const {
    data: academies,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetAcademyList(5);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (inView) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div>
      {academies?.pages
        ?.map((page) => page.result.academyList)
        .flat()
        .map((academy) => {
          console.log(academy);
          return (
            <div
              className='flex flex-col gap-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200'
              onClick={() => navigate(`/academy/${academy.academy.academyId}`)}
              key={academy.academy.academyId}
            >
              <h1 className='text-2xl font-bold text-gray-800'>
                {academy.academy.academyName}
              </h1>
              <div className='text-gray-600'>
                <span className='font-semibold'>Address:</span>{' '}
                {academy.academy.address}
              </div>
              <div className='text-gray-600'>
                <span className='font-semibold'>Email:</span>{' '}
                {academy.academy.email}
              </div>
              <div ref={ref}>{isFetching && <div>Loading...</div>}</div>
            </div>
          );
        })}
    </div>
  );
}
