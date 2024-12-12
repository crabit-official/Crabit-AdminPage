import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

export const client = (() =>
  axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 20000,
    withCredentials: true,
  }))();

client.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig;
    console.log(originalRequest);

    if (error.response?.status === 401) {
      try {
        const response = await client.get('/api/v1/auth/reissue-token');
        console.log(response);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
