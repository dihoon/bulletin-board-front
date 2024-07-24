import { PostData } from '@/types/post';
import dayjs from 'dayjs';

export default function Post(props: PostData) {
  const createDate = dayjs(props.createdAt).format('YYYY/MM/DD HH:mm');
  const updateDate = dayjs(props.updatedAt).format('YYYY/MM/DD HH:mm');

  const isUpdated = createDate != updateDate;

  return (
    <div className="post-container">
      <div className="post-title font-semibold">{props.title}</div>
      <div className="post-time font-medium">
        <div>작성됨 : {createDate}</div>
        {isUpdated && <div>수정됨 : {updateDate}</div>}
      </div>
      <div
        className="post-content font-medium"
        dangerouslySetInnerHTML={{ __html: props.content }}
      />
    </div>
  );
}
