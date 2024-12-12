import type {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TGetAcademyRegisterListResponse } from '../../types/admin';
import { ResponseError } from '../../types/common';
import { getAcademyRegisterList } from '../../apis/admin';

function useGetAcademyRegisterList(
  take: number,
  academyName?: string,
  queryOptions?: UseInfiniteQueryOptions<
    TGetAcademyRegisterListResponse,
    ResponseError,
    InfiniteData<TGetAcademyRegisterListResponse, number>,
    TGetAcademyRegisterListResponse,
    QueryKey,
    number
  >
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) =>
      getAcademyRegisterList({ academyName, cursor: pageParam, take }),
    queryKey: ['getAcademyRegisterList', academyName],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : null;
    },
    throwOnError: true,
    ...queryOptions,
  });
}

export default useGetAcademyRegisterList;
