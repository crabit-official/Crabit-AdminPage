import { getPendingAcademyList } from '@apis/academy';
import { queryKeys } from '@constants/keys.ts';
import type { InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { TPendingAcademyResponse } from '@/types/academy';
import type { ResponseError } from '@/types/query/common';

function useGetInfinitePendingAcademyList(
  take: number,
  academyName?: string,
  queryOptions?: UseInfiniteQueryOptions<
    TPendingAcademyResponse,
    ResponseError,
    InfiniteData<TPendingAcademyResponse, number>,
    TPendingAcademyResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getPendingAcademyList({ academyName, cursor: pageParam, take }),
    queryKey: [queryKeys.GET_ACADEMY_LIST, academyName],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : null;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePendingAcademyList;
