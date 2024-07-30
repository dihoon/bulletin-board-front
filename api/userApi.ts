'use client';

import { PostPaginationParams } from '@/types/post';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const getUserInfo = async () => {
  const response = await axiosInstance.get('/api/user');
  return response.data;
};

export const useUserInfoQuery = (
  options?: Partial<UseQueryOptions>
): UseQueryResult<any, Error> => {
  const defaultOptions: UseQueryOptions<any, Error> = {
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    select: (data) => data.data,
  };

  return useQuery({ ...defaultOptions, ...options });
};

export const getUserPosts = async (params: PostPaginationParams) => {
  const { page, size, sort } = params;
  const response = await axiosInstance.get(
    `/api/user/posts?page=${page}&size=${size}${sort ? `&sort=${sort}` : ''}`
  );
  return response.data;
};

export const useUserPostsQuery = (
  params: PostPaginationParams,
  options?: Partial<UseQueryOptions>
): UseQueryResult<any, Error> => {
  const defaultOptions: UseQueryOptions<any, Error> = {
    queryKey: ['posts', params],
    queryFn: () => getUserPosts(params),
    select: (data) => data?.data,
    enabled: false,
  };

  return useQuery({ ...defaultOptions, ...options });
};
