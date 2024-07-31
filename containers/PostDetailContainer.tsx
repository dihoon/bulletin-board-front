'use client';

import {
  useDeletePostMutation,
  usePostDetailQuery,
  useUpdatePostMutation,
} from '@/api/postApi';
import PostEditor from '@/components/PostEditor';
import TextArea from '@/components/TextArea';
import useAuthStore from '@/store/useAuthStore';
import { PostUpdateData } from '@/types/post';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Controller, FieldErrors, useForm } from 'react-hook-form';

interface Props {
  postId: string;
}

export default function PostDetailContainer(props: Props) {
  const { postId } = props;
  const router = useRouter();
  const { data, isLoading } = usePostDetailQuery(postId);
  const { register, control, handleSubmit, reset } = useForm<PostUpdateData>();
  const [isEditable, setIsEditable] = useState(false);
  const [render, setRender] = useState(1);
  const isYours = useAuthStore.getState().email == data?.userEmail;
  const updatePostMutation = useUpdatePostMutation();
  const deletePostMutation = useDeletePostMutation(router);

  const createDate = dayjs(data?.createdAt).format('YYYY/MM/DD HH:mm');
  const updateDate = dayjs(data?.updatedAt).format('YYYY/MM/DD HH:mm');

  const isUpdated = createDate != updateDate;

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
    setRender((prev) => prev * -1);
  };

  const onSubmit = useCallback(
    async (updateData: PostUpdateData) => {
      await updatePostMutation.mutateAsync({ postId, updateData });
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
      key={render}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
          <div className="w-full self-start overflow-hidden text-ellipsis whitespace-nowrap text-white md:flex-1 md:self-auto">
            작성자 : {data?.userEmail}
          </div>
          {isYours && (
            <div className="flex gap-3 self-end">
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
        <Controller<PostUpdateData>
          name="content"
          control={control}
          render={({ field }) => {
            const { ref, ...rest } = field;
            return (
              <div className="post-editor-container flex-1">
                <TextArea
                  className="min-h-[72px] resize-none overflow-hidden break-all bg-transparent text-[24px] font-bold text-black"
                  registerReturn={register('title', {
                    required: '제목을 입력하세요',
                  })}
                  defaultValue={data.title}
                  disabled={!isEditable}
                  placeholder="제목"
                  maxRows={2}
                />
                <div className="post-time mt-4 font-medium">
                  <div>작성됨 : {createDate}</div>
                  {isUpdated && <div>수정됨 : {updateDate}</div>}
                </div>
                <PostEditor
                  {...rest}
                  content={data.content}
                  editable={isEditable}
                />
              </div>
            );
          }}
        />
      </div>
    </form>
  );
}
