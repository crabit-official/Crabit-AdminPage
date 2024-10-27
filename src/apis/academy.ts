import axiosInstance from '@apis/axiosInstance.ts';

import type { TAcceptAcademyResponse, TPendingAcademyResponse, TRejectAcademyResponse } from '@/types/academy';

export const getPendingAcademyList = async ({
  academyName,
  cursor,
  take,
}: {
  academyName?: string;
  cursor: number;
  take: number;
}): Promise<TPendingAcademyResponse> => {
  let url = `/api/v1/admin/academies?cursor=${cursor}&take=${take}`;

  if (academyName) {
    url += `&academyName=${academyName}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};

export const acceptAcademy = async ({ academyId }: { academyId: number }): Promise<TAcceptAcademyResponse> => {
  const { data } = await axiosInstance.post(`/api/v1/admin/academies/${academyId}`);

  return data;
};

export const rejectAcademy = async ({ academyId }: { academyId: number }): Promise<TRejectAcademyResponse> => {
  const { data } = await axiosInstance.delete(`/api/v1/admin/academies/${academyId}`);

  return data;
};
