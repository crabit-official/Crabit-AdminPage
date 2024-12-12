import { TAcademyDTO, TMemberDTO, TTeacherDTO } from '../dtos';
import { APPROVAL_STATUS, FREEMIUM_TIER } from '../enum';
import { TCommonResponse } from './common';

// 특정 학원 상세 조회export
export type TGetDetailAcademyInfoRequest = {
  academyId: number;
};
export type TGetDetailAcademyInfoResponse = TCommonResponse<{
  academy: TAcademyDTO;
  teacher: TTeacherDTO;
  member: TMemberDTO;
}>;

// 학원 정보 수정
export type TUpdateAcademyInfoRequest = {
  academyId: number;
  academyName: string;
  address: string;
  addressDetail: string;
  mainImageUrl: string;
  freemiumTier: FREEMIUM_TIER;
  contactNumber: string;
};
export type TUpdateAcademyInfoResponse = TCommonResponse<{
  academyId: number;
}>;

// 학원 삭제
export type TDeleteAcademyRequest = {
  academyId: number;
};
export type TDeleteAcademyResponse = TCommonResponse<{
  academyId: number;
  deletedAt: Date;
}>;

// 학원 등록 신청 승인
export type TApproveAcademyRegisterRequest = {
  academyId: number;
};
export type TApproveAcademyRegisterResponse = TCommonResponse<{
  academyId: number;
  academyName: string;
  principalId: number;
}>;

// 학원 등록 신청 거절
export type TRejectAcademyRegisterRequest = {
  academyId: number;
};
export type TRejectAcademyRegisterResponse = TCommonResponse<{
  academyId: number;
  academyName: string;
  principalId: number;
}>;

// 학원 리스트 조회
export type TGetAcademyListRequest = {
  approvalStatus?: APPROVAL_STATUS;
  academyName?: string;
  cursor: number;
  take: number;
};
export type TGetAcademyListResponse = TCommonResponse<{
  academyList: {
    academy: TAcademyDTO;
  }[];
  nextCursor: number;
  hasNext: boolean;
}>;

// 학원 신청 리스트 조회
export type TGetAcademyRegisterListRequest = {
  academyName?: string;
  cursor: number;
  take: number;
};

export type TGetAcademyRegisterListResponse = TCommonResponse<{
  pendingAcademyList: {
    academy: TAcademyDTO;
  }[];
  nextCursor: number;
  hasNext: boolean;
}>;
