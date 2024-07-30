'use client';

import { useRouter } from 'next/navigation';
import { FieldErrors, useForm } from 'react-hook-form';
import { useSignUpMutation } from '../api/authApi';
import { SignUpData } from '../types';

interface SignUpFormInputs extends SignUpData {
  passwordConfirm: string;
}

export default function SignUpFormContainer() {
  const { register, handleSubmit } = useForm<SignUpFormInputs>();
  const router = useRouter();

  const signUpMutation = useSignUpMutation(router);

  const onSubmit = (signUpData: SignUpData) => {
    const { email, password } = signUpData;
    signUpMutation.mutate({ email, password });
  };

  const onError = (errors: FieldErrors<SignUpFormInputs>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof SignUpFormInputs;
    const firstErrorMessage = errors[firstErrorKey];
    alert(firstErrorMessage?.message);
  };

  return (
    <div className="custom-container flex flex-col items-center">
      <div className="mb-10 text-60 font-bold text-white">회원가입</div>
      <form
        className="flex w-full max-w-[370px] flex-col"
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
        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register('passwordConfirm', {
            required: '비밀번호를 입력하세요.',
            validate: (value, context) =>
              value === context.password || '비밀번호가 일치하지 않습니다.',
          })}
          className="custom-input mt-4"
        />
        <button className="custom-button mt-4">회원가입</button>
      </form>
    </div>
  );
}
