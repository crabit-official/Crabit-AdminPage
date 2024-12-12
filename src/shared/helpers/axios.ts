import axios from 'axios';

export const client = (() =>
  axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
    timeout: 20000,
    withCredentials: true,
  }))();
