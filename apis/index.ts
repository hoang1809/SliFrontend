import axios, { AxiosError } from 'axios';
import { StorageKeys } from 'constants/global';
import { GetServerSidePropsContext } from 'next';

let context = <GetServerSidePropsContext>{};
const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL!}/${process.env.NEXT_PUBLIC_BACKEND_VERSION}`;
const TIMEOUT = 8000;
export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

export const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  timeout: TIMEOUT
});

instance.interceptors.request.use((config: any) => {
  const token = localStorage.getItem(StorageKeys.accessToken);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: AxiosError) => {
    // to do, handle refresh token at here
    return error;
  },
);
