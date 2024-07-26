'use client';

import {
  PostPaginationParams,
  PostReqestData,
  PostUpdateData,
} from '@/types/post';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
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
    select: (data) => data.data,
    placeholderData: keepPreviousData,
    enabled: false,
  });
};

const getPostDetail = async (postId: string) => {
  const response = await axiosInstance.get(`/api/posts/${postId}`);
  return response.data;
};

export const usePostDetailQuery = (postId: string) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostDetail(postId),
    select: (data) => data.data,
  });
};

const createPost = async (postData: PostReqestData) => {
  const response = await axiosInstance.post('/api/posts', postData);
  return response.data;
};

export const useCreatePostMutation = (router: AppRouterInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postData: PostReqestData) => createPost(postData),
    onSuccess: async (data, variables) => {
      alert('작성 성공');
      await queryClient.invalidateQueries({
        queryKey: ['posts'],
        refetchType: 'all',
        exact: false,
      });
      router.push('/list');
    },
    onError: () => alert('작성 실패'),
  });
};

const updatePost = async (postId: string, updateData: PostUpdateData) => {
  const response = await axiosInstance.patch(
    `/api/posts/${postId}`,
    updateData
  );
  return response.data;
};

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      updateData,
    }: {
      postId: string;
      updateData: PostUpdateData;
    }) => updatePost(postId, updateData),
    onSuccess: (data, variables) => {
      alert('저장 성공');
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        refetchType: 'all',
      });
    },
    onError: () => alert('저장 실패'),
  });
};

const deletePost = async (postId: string) => {
  const response = await axiosInstance.delete(`/api/posts/${postId}`);
  return response.data;
};

export const useDeletePostMutation = (router: AppRouterInstance) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['posts'],
        refetchType: 'all',
      });
      router.push('/list');
    },
    onError: () => alert('삭제 실패'),
  });
};
