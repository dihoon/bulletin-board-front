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
    onError: (error: any) => alert(`회원가입 실패 : ${error}`),
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
    onError: (error: any) => alert(`로그인 실패 : ${error}`),
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
    onSuccess: async () => {
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
      console.log('액세스 토큰 재발급');
      console.log('리프레시 res : ', res);
      authStore.setEmail(res.email);
      authStore.setAccessToken(res.token);
    },
    onError: (error: any) => console.log('액세스 토큰 재발급 실패 : ', error),
  });
};
