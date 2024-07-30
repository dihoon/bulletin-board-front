'use client';

import { useCreatePostMutation } from '@/api/postApi';
import PostEditor from '@/components/PostEditor';
import TextArea from '@/components/TextArea';
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
      className="custom-container flex h-full max-h-[calc(100vh-72px)] justify-center"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="box-content flex w-full max-w-[1080px] flex-col gap-4">
        <button type="submit" className="custom-button self-end">
          글 작성
        </button>
        <Controller<PostReqestData>
          name="content"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <div className="post-editor-container flex-1">
                <div className="hover-effect">
                  <TextArea
                    className="min-h-[72px] w-full resize-none overflow-hidden break-all bg-transparent text-[24px] font-bold outline-none placeholder:text-black"
                    registerReturn={register('title', {
                      required: '제목을 입력하세요',
                    })}
                    placeholder="제목"
                    maxRows={2}
                    autoFocus
                  />
                </div>
                <div className="post-time mt-4 font-medium"></div>
                <div className="hover-effect flex-1">
                  <PostEditor className="h-full" {...rest} />
                </div>
              </div>
            );
          }}
        />
      </div>
    </form>
  );
}
