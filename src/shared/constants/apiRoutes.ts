const version = {
  v1: '/v1',
};

export const apiRoutes = {
  // 유저 관리 API
  auth: {
    login: `/api/${version.v1}/auth/login`,
    logout: `/api/${version.v1}/auth/logout`,
  },
  admin: {
    // 특정 학원 상세 조회
    getAcademy: `/api/${version.v1}/admin/academy/`,
  },
};
