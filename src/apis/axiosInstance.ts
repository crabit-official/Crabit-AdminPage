import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface IFailedRequests {
  resolve: (value: AxiosResponse) => void;
  reject: (value: AxiosError) => void;
  config: AxiosRequestConfig;
  error: AxiosError;
}

let failedRequests: IFailedRequests[] = [];
let isTokenRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalRequestConfig = error.config!;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          config: originalRequestConfig,
          error,
        });
      });
    }

    isTokenRefreshing = true;

    try {
      const response = await axiosInstance.get('/api/v1/auth/reissue-token', {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('refreshToken') ?? '')}`,
        },
      });
      const { accessToken = null, refreshToken = null } = response.data.result ?? {};

      if (!accessToken || !refreshToken) {
        throw new Error('Something went wrong while refreshing your access token');
      }

      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

      failedRequests.forEach(({ resolve, reject, config }) => {
        axiosInstance(config)
          // eslint-disable-next-line @typescript-eslint/no-shadow
          .then((response) => resolve(response))
          // eslint-disable-next-line @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-argument
          .catch((error) => reject(error));
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      failedRequests.forEach(({ reject, error }) => reject(error));
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      return Promise.reject(error);
    } finally {
      failedRequests = [];
      isTokenRefreshing = false;
    }

    return axiosInstance(originalRequestConfig);
  },
);

export default axiosInstance;
