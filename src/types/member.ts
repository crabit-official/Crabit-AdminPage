import type { CommonResponse } from '@/types/query/common';

export type TMemberDTO = {
  memberId: number;
  name: string;
  email: string;
  deletedAt: Date;
};

export type TInfiniteMemberDTO = {
  memberList: TMemberDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type TCrabitMemberResponse = CommonResponse<TInfiniteMemberDTO>;
