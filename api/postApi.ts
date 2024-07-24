'use client';

import {
  keepPreviousData,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query';
import axiosInstance from './axiosInstance';

interface PostParams {
  page: number;
  size: number;
  sort?: string;
}

export const getPosts = async (params: PostParams) => {
  const { page, size, sort } = params;
  const response = await axiosInstance.get(
    `/api/posts/?page=${page}&size=${size}${sort ? `&sort=${sort}` : ''}`
  );
  return response.data;
};

export const usePostsQuery = (
  params: PostParams
): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['posts', params],
    queryFn: () => getPosts(params),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
};
