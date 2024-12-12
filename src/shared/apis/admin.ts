import { client } from '../helpers/axios';
import {
  TApproveAcademyRegisterRequest,
  TApproveAcademyRegisterResponse,
  TDeleteAcademyRequest,
  TDeleteAcademyResponse,
  TGetAcademyListRequest,
  TGetAcademyListResponse,
  TGetAcademyRegisterListRequest,
  TGetAcademyRegisterListResponse,
  TGetDetailAcademyInfoRequest,
  TGetDetailAcademyInfoResponse,
  TRejectAcademyRegisterRequest,
  TRejectAcademyRegisterResponse,
  TUpdateAcademyInfoRequest,
  TUpdateAcademyInfoResponse,
} from '../types/admin';

// 특정 학원 상세 조회
export const getDetailAcademyInfo = async ({
  academyId,
}: TGetDetailAcademyInfoRequest): Promise<TGetDetailAcademyInfoResponse> => {
  const { data } = await client.get(`/api/v1/admin/academies/${academyId}`);

  return data;
};

// 학원 정보 수정
export const updateAcademyInfo = async ({
  academyId,
  academyName,
  address,
  addressDetail,
  mainImageUrl,
  freemiumTier,
  contactNumber,
}: TUpdateAcademyInfoRequest): Promise<TUpdateAcademyInfoResponse> => {
  const { data } = await client.put(`/api/v1/admin/academies/${academyId}`, {
    academyName,
    address,
    addressDetail,
    mainImageUrl,
    freemiumTier,
    contactNumber,
  });

  return data;
};

// 학원 삭제
export const deleteAcademy = async ({
  academyId,
}: TDeleteAcademyRequest): Promise<TDeleteAcademyResponse> => {
  const { data } = await client.delete(`/api/v1/admin/academies/${academyId}`);

  return data;
};

// 학원 등록 신청 승인
export const approveAcademyRegister = async ({
  academyId,
}: TApproveAcademyRegisterRequest): Promise<TApproveAcademyRegisterResponse> => {
  const { data } = await client.post(
    `/api/v1/admin/academies/pending/${academyId}`
  );

  return data;
};

// 학원 등록 신청 거절
export const rejectAcademyRegister = async ({
  academyId,
}: TRejectAcademyRegisterRequest): Promise<TRejectAcademyRegisterResponse> => {
  const { data } = await client.delete(
    `/api/v1/admin/academies/pending/${academyId}`
  );

  return data;
};

// 학원 리스트 조회
export const getAcademyList = async ({
  approvalStatus,
  academyName,
  cursor,
  take,
}: TGetAcademyListRequest): Promise<TGetAcademyListResponse> => {
  const { data } = await client.get(`/api/v1/admin/academies`, {
    params: {
      approvalStatus,
      academyName,
      cursor,
      take,
    },
  });

  return data;
};

// 학원 신청 리스트 조회
export const getAcademyRegisterList = async ({
  academyName,
  cursor,
  take,
}: TGetAcademyRegisterListRequest): Promise<TGetAcademyRegisterListResponse> => {
  const { data } = await client.get('/api/v1/admin/academies/pending', {
    params: {
      academyName,
      cursor,
      take,
    },
  });

  return data;
};
