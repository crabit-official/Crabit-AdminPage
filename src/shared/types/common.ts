import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export type TCommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

export type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

export type UseMutationCustomOptions<
  TData = unknown,
  TVariables = unknown
> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

export type UseQueryCustomOptions<
  TQueryFnData = unknown,
  TData = TQueryFnData
> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;
