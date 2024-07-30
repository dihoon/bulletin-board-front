'use client';

import { PostData } from '@/types/post';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import dayjs from 'dayjs';

interface Props extends PostData {
  onClick?: () => void;
  isEditable?: boolean;
}

export default function Post(props: Props) {
  const { title, content } = props;

  const createDate = dayjs(props.createdAt).format('YYYY/MM/DD HH:mm');
  const updateDate = dayjs(props.updatedAt).format('YYYY/MM/DD HH:mm');

  const isUpdated = createDate != updateDate;

  const editor = useEditor({
    extensions: [StarterKit],
    content: content || '',
    editable: false,
    immediatelyRender: false,
  });

  return (
    <div className="post-container lg:flex-1" onClick={props.onClick}>
      <div className="post-title font-semibold">{title}</div>
      <div className="post-time mt-4 font-medium">
        <div>작성됨 : {createDate}</div>
        {isUpdated && <div>수정됨 : {updateDate}</div>}
      </div>
      <EditorContent
        className="post-content-view line-clamp-[10] overflow-hidden"
        editor={editor}
        content={props.content}
      />
    </div>
  );
}
