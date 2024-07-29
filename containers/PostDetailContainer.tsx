'use client';

import {
  useDeletePostMutation,
  usePostDetailQuery,
  useUpdatePostMutation,
} from '@/api/postApi';
import PostEditor from '@/components/PostEditor';
import useAuthStore from '@/store/useAuthStore';
import { PostUpdateData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';

interface Props {
  postId: string;
}

export default function PostDetailContainer(props: Props) {
  const { postId } = props;
  const router = useRouter();
  const { data, isLoading, isSuccess } = usePostDetailQuery(postId);
  const { register, control, handleSubmit, reset } = useForm<PostUpdateData>();
  const [isEditable, setIsEditable] = useState(false);
  const isYours = useAuthStore.getState().email == data?.userEmail;
  const updatePostMutation = useUpdatePostMutation();
  const deletePostMutation = useDeletePostMutation(router);

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data, reset]);

  const handlClickEdit = () => {
    setIsEditable(true);
  };

  const handleCancel = () => {
    setIsEditable(false);
  };

  const onSubmit = useCallback(
    (updateData: PostUpdateData) => {
      updatePostMutation.mutate({ postId, updateData });
      setIsEditable(false);
    },
    [postId, updatePostMutation]
  );

  const onError = (errors: FieldErrors<PostUpdateData>) => {
    const firstErrorKey = Object.keys(errors)[0] as keyof PostUpdateData;
    const firstErrorMessage = errors[firstErrorKey];
    alert(firstErrorMessage?.message);
  };

  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까')) deletePostMutation.mutate(postId);
  };

  if (isLoading) return;

  return (
    <form
      className="custom-container h-full max-h-[calc(100vh-72px)] min-h-[500px]"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-white">작성자 : {data?.userEmail}</div>
          {isYours && (
            <div className="flex gap-3">
              {!isEditable && (
                <button
                  type="button"
                  className="custom-button"
                  onClick={handlClickEdit}
                >
                  수정
                </button>
              )}
              {isEditable && (
                <>
                  <button type="submit" className="custom-button">
                    저장
                  </button>
                  <button
                    type="button"
                    className="custom-button"
                    onClick={handleCancel}
                  >
                    취소
                  </button>
                </>
              )}
              <button
                type="button"
                className="custom-button"
                onClick={handleDelete}
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <input
          className="post-title-view mb-4"
          placeholder="제목"
          {...register('title', { required: '제목을 입력하세요' })}
          defaultValue={data.title}
          disabled={!isEditable}
        />
        <Controller<PostUpdateData>
          name="content"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <PostEditor
                {...rest}
                content={data.content}
                editable={isEditable}
              />
            );
          }}
        />
      </div>
    </form>
  );
}
