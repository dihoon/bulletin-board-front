'use client';

import { PostPaginationParams } from '@/types/post';
import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

export const getPosts = async (params: PostPaginationParams) => {
  const { page, size, sort } = params;
  const response = await axiosInstance.get(
    `/api/posts/?page=${page}&size=${size}${sort ? `&sort=${sort}` : ''}`
  );
  return response.data;
};

export const usePostsQuery = (
  params: PostPaginationParams
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
};
