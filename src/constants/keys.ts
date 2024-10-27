export const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  GET_CRABIT_MEMBERS: 'getCrabitMembers',
  GET_ACADEMY_LIST: 'getAcademyList',
} as const;

export const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
} as const;
