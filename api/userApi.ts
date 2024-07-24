'use client';

import { PostPaginationParams } from '@/types/post';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const getUserInfo = async () => {
  const response = await axiosInstance.get('/api/user');
  return response.data;
};

export const useUserInfoQuery = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserInfo(),
    select: (data) => data.data,
  });
};

export const getUserPosts = async (params: PostPaginationParams) => {
  const { page, size, sort } = params;
  const response = await axiosInstance.get(
    `/api/user/posts?page=${page}&size=${size}${sort ? `&sort=${sort}` : ''}`
  );
  return response.data;
};

export const useUserPostsQuery = (
  params: PostPaginationParams
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getUserPosts(params),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
};
