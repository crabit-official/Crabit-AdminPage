import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TGetAcademyListResponse } from '../../types/admin';
import { ResponseError } from '../../types/common';
import { getAcademyList } from '../../apis/admin';
import { APPROVAL_STATUS } from '../../enum';

function useGetAcademyList(
  take: number,
  academyName?: string,
  approvalStatus?: APPROVAL_STATUS,
  queryOptions?: UseInfiniteQueryOptions<
    TGetAcademyListResponse,
    ResponseError,
    InfiniteData<TGetAcademyListResponse, number>,
    TGetAcademyListResponse,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getAcademyList({ approvalStatus, academyName, cursor: pageParam, take }),
    queryKey: ['academies', academyName, approvalStatus],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : null;
    },
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetAcademyList;
