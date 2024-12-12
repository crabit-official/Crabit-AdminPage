import { GLOBAL_ROLE, SOCIAL_TYPE } from '../enum';

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
