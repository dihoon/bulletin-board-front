'use client';

import { useLoginMutation } from '@/api/authApi';
import { LoginData } from '@/types';
import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';

export default function LoginFormContainer() {
  const { register, handleSubmit } = useForm<LoginData>();
  const router = useRouter();

  const loginMutation = useLoginMutation(router);

  const onSubmit = (loginData: LoginData) => {
    loginMutation.mutate(loginData);
  };

  const onError = (errors: FieldErrors<LoginData>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof LoginData;
    const firstErrorMessage = errors[firstErrorKey];
    alert(firstErrorMessage?.message);
  };

  return (
    <div className="custom-container flex flex-col items-center">
      <div className="mb-10 text-60 font-bold text-white">로그인</div>
      <form
        className="flex w-full max-w-[350px] flex-col"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <input
          type="text"
          placeholder="이메일"
          {...register('email', {
            required: '이메일을 입력하세요.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '유효한 이메일이 아닙니다.',
            },
          })}
          className="custom-input"
        />
        <input
          type="password"
          placeholder="비밀번호"
          {...register('password', { required: '비밀번호를 입력하세요.' })}
          className="custom-input mt-4"
        />
        <button className="custom-button mt-4">로그인</button>
      </form>
    </div>
  );
}
