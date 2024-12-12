import { GLOBAL_ROLE, SOCIAL_TYPE } from '../enum';
import { TCommonResponse } from './common';

// 로그인
export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  socialType: SOCIAL_TYPE;
  name: string;
  profileImageUrl: string;
  globalRole: GLOBAL_ROLE;
};

// 로그아웃
export type TLogoutResponse = TCommonResponse<object>;

// 내 정보 조회
export type TGetMyInfoResponse = TCommonResponse<{
  memberId: number;
  name: string;
  email: string;
  socialType: SOCIAL_TYPE;
  profileImageUrl: string;
  globalRole: GLOBAL_ROLE;
  accessToken: string;
}>;
