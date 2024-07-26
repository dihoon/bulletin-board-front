'use client';

import { PostData } from '@/types/post';
import dayjs from 'dayjs';
import { useState } from 'react';

interface Props extends PostData {
  onClick?: () => void;
  isEditable?: boolean;
}

export default function Post(props: Props) {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);

  const createDate = dayjs(props.createdAt).format('YYYY/MM/DD HH:mm');
  const updateDate = dayjs(props.updatedAt).format('YYYY/MM/DD HH:mm');

  const isUpdated = createDate != updateDate;

  return (
    <div className="post-container" onClick={props.onClick}>
      <div className="post-title font-semibold">{title}</div>
      <div className="post-time mt-4 font-medium">
        <div>작성됨 : {createDate}</div>
        {isUpdated && <div>수정됨 : {updateDate}</div>}
      </div>
      <div
        className="post-content post-content-view font-medium"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
