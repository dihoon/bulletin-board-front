'use client';

import useAuthStore from '@/store/useAuthStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { LoginData, SignUpData } from '../types';
import axiosInstance from './axiosInstance';

const signUp = async (signUpData: SignUpData) => {
  const response = await axiosInstance.post('/api/auth/sign-up', signUpData);
  return response.data;
};

export const useSignUpMutation = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: (signUpData: SignUpData) => signUp(signUpData),
    onSuccess: () => {
      alert('회원 가입 성공!');
      router.push('/login');
    },
    onError: (error: any) => {
      if (error.response.status === 409) {
        alert('이미 가입된 계정입니다.');
      } else {
        alert(`회원가입 실패`);
      }
    },
  });
};

const login = async (loginData: LoginData) => {
  const response = await axiosInstance.post('/api/auth/login', loginData);
  return response.data;
};

export const useLoginMutation = (router: AppRouterInstance) => {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: (loginData: LoginData) => login(loginData),
    onSuccess: (res) => {
      alert('로그인 성공!');
      authStore.setEmail(res.email);
      authStore.setAccessToken(res.token);
      router.push('/');
    },
    onError: (error: any) => alert(`잘못된 계정 정보입니다.`),
  });
};

const logout = async () => {
  const response = await axiosInstance.post('/api/auth/logout');
  return response.data;
};

export const useLogoutMutation = (router: AppRouterInstance) => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      authStore.reset();
      router.push('/');
    },
  });
};

const refreshAccessToken = async () => {
  const response = await axiosInstance.post('/api/auth/refresh');
  return response.data;
};

export const useRefreshAceesTokenMutation = () => {
  const authStore = useAuthStore();
  return useMutation({
    mutationFn: refreshAccessToken,
    onSuccess: (res) => {
      authStore.setEmail(res.email);
      authStore.setAccessToken(res.token);
    },
    onError: (error: any) => console.error('액세스 토큰 재발급 실패 : ', error),
  });
};

const deleteAccount = async () => {
  const response = await axiosInstance.delete(`/api/auth`);
  return response.data;
};

export const useDeleteAccountMutation = () => {
  const authStore = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.clear();
      authStore.reset();
      alert('회원 탈퇴 성공!');
    },
    onError: () => alert('회원 탈퇴 실패'),
  });
};
