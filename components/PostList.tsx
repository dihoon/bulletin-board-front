import { PostData } from '@/types/post';
import { MutableRefObject } from 'react';
import Post from './Post';

interface Props {
  posts: PostData[];
  observerRef: MutableRefObject<HTMLDivElement | null>;
}

export default function PostList(props: Props) {
  const { posts, observerRef } = props;

  return (
    <div className="post-list-container">
      {Array.isArray(posts) &&
        posts?.map((post, index) => {
          return <Post key={index} {...post} />;
        })}
      <div ref={observerRef} style={{ height: '100px' }}></div>
    </div>
  );
}
