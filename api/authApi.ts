'use client';

import { useMutation } from '@tanstack/react-query';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { SignUpData } from '../types';
import axiosInstance from './axiosInstance';

const signUp = async (signUpdata: SignUpData) => {
  const response = await axiosInstance.post('/api/auth/sign-up', signUpdata);
  return response.data;
};

export const useSignUpMutation = (router: AppRouterInstance) => {
  return useMutation({
    mutationFn: (signUpdata: SignUpData) => signUp(signUpdata),
    onSuccess: () => {
      alert('회원 가입 성공!');
      router.push('/login');
    },
    onError: (error: any) => alert(`회원가입 실패 : ${error}`),
  });
};
