import { useQuery } from '@tanstack/react-query';
import { TGetDetailAcademyInfoRequest } from '../../types/admin';
import { getDetailAcademyInfo } from '../../apis/admin';

function useGetDetailAcademyInfo({ academyId }: TGetDetailAcademyInfoRequest) {
  return useQuery({
    queryFn: () => getDetailAcademyInfo({ academyId }),
    queryKey: ['academy', academyId],
    throwOnError: true,
  });
}

export default useGetDetailAcademyInfo;
