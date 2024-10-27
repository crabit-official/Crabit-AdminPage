import axiosInstance from '@apis/axiosInstance.ts';

import type { TCrabitMemberResponse } from '@/types/member';

export const getCrabitMembers = async ({ nickname, cursor, take }: { nickname?: string; cursor: number; take: number }): Promise<TCrabitMemberResponse> => {
  let url = `/api/v1/admin/members?cursor=${cursor}&take=${take}`;

  if (nickname) {
    url += `&nickname=${nickname}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};
