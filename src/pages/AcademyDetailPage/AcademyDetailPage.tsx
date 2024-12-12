import { useParams } from 'react-router-dom';
import useGetDetailAcademyInfo from '../../shared/hooks/admin/useGetDetailAcademyInfo';
import { APPROVAL_STATUS } from '../../shared/enum';

export default function AcademyDetailPage() {
  const { academyId } = useParams();
  const { data: academy } = useGetDetailAcademyInfo({
    academyId: Number(academyId),
  });

  if (!academy) {
    return <div className='text-center py-20'>Loading...</div>;
  }

  const { academy: academyInfo, teacher, member } = academy.result;

  console.log(import.meta.env.VITE_S3_IMAGE + teacher.profileImageUrl);

  return (
    <div className='max-w-5xl mx-auto p-6 bg-gray-50 shadow-md rounded-lg mt-8'>
      {/* 학원 정보 섹션 */}
      <section className='mb-8'>
        <div className='flex gap-6 items-start'>
          <img
            src={`${import.meta.env.VITE_S3_IMAGE}/${academyInfo.mainImageUrl}`}
            alt={`${academyInfo.academyName} 메인 이미지`}
            className='w-48 h-48 object-cover rounded-lg shadow'
          />
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {academyInfo.academyName}
            </h1>
            <p className='text-gray-600'>
              <span className='font-semibold'>주소:</span> {academyInfo.address}
              , {academyInfo.addressDetail}
            </p>
            <p className='text-gray-600'>
              <span className='font-semibold'>연락처:</span>{' '}
              {academyInfo.contactNumber}
            </p>
            <p className='text-gray-600'>
              <span className='font-semibold'>이메일:</span> {academyInfo.email}
            </p>
            <p className='text-gray-600'>
              <span className='font-semibold'>승인 상태:</span>{' '}
              <span
                className={`px-2 py-1 text-sm rounded ${
                  academyInfo.approvalStatus === APPROVAL_STATUS.APPROVED
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {academyInfo.approvalStatus}
              </span>
            </p>
            <p className='text-gray-600'>
              <span className='font-semibold'>생성일:</span>{' '}
              {new Date(academyInfo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* 강사 정보 섹션 */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>강사 정보</h2>
        <div className='flex items-center gap-4'>
          <img
            src={`${import.meta.env.VITE_S3_IMAGE}/${teacher.profileImageUrl}`}
            alt={`${teacher.nickname} 프로필 이미지`}
            className='w-20 h-20 rounded-full shadow'
          />
          <div>
            <p className='text-lg font-bold text-gray-800'>
              {teacher.nickname}
            </p>
            <p className='text-gray-600'>{teacher.introduction}</p>
            <p className='text-gray-600 text-sm'>
              <span className='font-semibold'>생성일:</span>{' '}
              {new Date(teacher.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* 멤버 정보 섹션 */}
      <section>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>회원 정보</h2>
        <div className='flex items-center gap-4'>
          <img
            src={`${import.meta.env.VITE_S3_IMAGE}/${member.profileImageUrl}`}
            alt={`${member.name} 프로필 이미지`}
            className='w-20 h-20 rounded-full shadow'
          />
          <div>
            <p className='text-lg font-bold text-gray-800'>{member.name}</p>
            <p className='text-gray-600'>{member.email}</p>
            <p className='text-gray-600'>
              <span className='font-semibold'>소셜 타입:</span>{' '}
              {member.socialType}
            </p>
            <p className='text-gray-600 text-sm'>
              <span className='font-semibold'>생성일:</span>{' '}
              {new Date(member.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
