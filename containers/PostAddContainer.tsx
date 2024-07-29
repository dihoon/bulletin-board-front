'use client';

import { useCreatePostMutation } from '@/api/postApi';
import PostEditor from '@/components/PostEditor';
import { PostReqestData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { Controller, FieldErrors, useForm } from 'react-hook-form';

export default function PostAddContainer() {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<PostReqestData>();

  const createPostMutation = useCreatePostMutation(router);

  const onSubmit = async (data: PostReqestData) => {
    createPostMutation.mutate(data);
  };

  const onError = (errors: FieldErrors<PostReqestData>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof PostReqestData;
    const firstErrorMessage = errors[firstErrorKey];
    alert(firstErrorMessage?.message);
  };

  return (
    <form
      className="custom-container flex h-full justify-center"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="box-content flex w-full max-w-[1080px] flex-col gap-4">
        <button type="submit" className="custom-button self-end">
          글 작성
        </button>
        <input
          className="post-title-view"
          placeholder="제목"
          {...register('title', { required: '제목을 입력하세요' })}
        />
        <Controller<PostReqestData>
          name="content"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return <PostEditor {...rest} />;
          }}
        />
      </div>
    </form>
  );
}
