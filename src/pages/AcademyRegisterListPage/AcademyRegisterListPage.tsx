import { useEffect } from 'react';
import useGetAcademyRegisterList from '../../shared/hooks/admin/useGetAcademyRegisterList';
import { useInView } from 'react-intersection-observer';
import useApproveAcademyRegister from '../../shared/hooks/admin/useApproveAcademyRegister';
import useRejectAcademyRegister from '../../shared/hooks/admin/useRejectAcademyRegister';
import { useNavigate } from 'react-router-dom';

export default function AcademyRegisterListPage() {
  const {
    data: academies,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetAcademyRegisterList(5);

  const { mutateAsync: approveAcademy } = useApproveAcademyRegister();
  const { mutateAsync: rejectAcademy } = useRejectAcademyRegister();

  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  console.log(academies);

  return (
    <div>
      {academies?.pages
        ?.map((page) => page.result.pendingAcademyList)
        .flat()
        .map((academy) => {
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
              <div className='flex gap-2'>
                <button
                  className='px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 active:bg-green-700 transition-all duration-200'
                  onClick={() =>
                    approveAcademy({
                      academyId: academy.academy.academyId,
                    })
                  }
                >
                  승인
                </button>
                <button
                  className='px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 active:bg-red-700 transition-all duration-200'
                  onClick={() =>
                    rejectAcademy({
                      academyId: academy.academy.academyId,
                    })
                  }
                >
                  거절
                </button>
              </div>
            </div>
          );
        })}
      <div ref={ref}>{isFetching && <div>Loading...</div>}</div>
    </div>
  );
}
