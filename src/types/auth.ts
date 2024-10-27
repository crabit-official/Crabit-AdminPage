import type { CommonResponse } from '@/types/query/common';

export type TSignInDTO = {
  accessToken: string;
  refreshToken: string;
  socialType: string;
  name: string;
  profileImageUrl: string;
  globalRole: string;
};

export type TUserDTO = {
  memberId: string;
  name: string;
  email: string;
  socialType: string;
  profileImageUrl: string;
  globalRole: string;
};

export type TSignInResponse = CommonResponse<TSignInDTO>;
export type TRotateTokenResponse = CommonResponse<TSignInDTO>;
export type TUserResponse = CommonResponse<TUserDTO>;
