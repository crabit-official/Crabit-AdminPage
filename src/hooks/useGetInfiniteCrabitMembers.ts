import { getCrabitMembers } from '@apis/member.ts';
import { queryKeys } from '@constants/keys.ts';
import type { InfiniteData, QueryKey, UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { TCrabitMemberResponse } from '@/types/member';
import type { ResponseError } from '@/types/query/common';

function useGetInfiniteCrabitMembers(
  take: number,
  nickname?: string,
  queryOptions?: UseInfiniteQueryOptions<
    TCrabitMemberResponse,
    ResponseError,
    InfiniteData<TCrabitMemberResponse, number>,
    TCrabitMemberResponse,
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getCrabitMembers({ nickname, cursor: pageParam, take }),
    queryKey: [queryKeys.GET_CRABIT_MEMBERS, nickname],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.result.hasNext ? lastPage.result.nextCursor : null;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteCrabitMembers;
