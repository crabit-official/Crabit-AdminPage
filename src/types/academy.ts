import type { CommonResponse } from '@/types/query/common';

export type TAcademyDTO = {
  academy: {
    academyId: number;
    name: string;
    email: string;
    address: string;
    addressDetail: string;
    studentCount: number;
    contactNumber: string;
  };
};

export type TInfiniteMemberDTO = {
  pendingAcademyList: TAcademyDTO[];
  nextCursor: number;
  hasNext: boolean;
};

export type TPendingAcademyResponse = CommonResponse<TInfiniteMemberDTO>;

export type TAcceptAcademyDTO = {
  academyId: number;
  academyName: string;
  principalId: number;
};

export type TAcceptAcademyResponse = CommonResponse<TAcceptAcademyDTO>;

export type TRejectAcademyDTO = {
  academyId: number;
  academyName: string;
  principalId: number;
};

export type TRejectAcademyResponse = CommonResponse<TRejectAcademyDTO>;
