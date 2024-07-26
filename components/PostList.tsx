import { PostData } from '@/types/post';
import { MutableRefObject } from 'react';
import Post from './Post';

interface Props {
  posts: PostData[];
  observerRef: MutableRefObject<HTMLDivElement | null>;
  onClick?: (postId: number) => void;
}

export default function PostList(props: Props) {
  const { posts, observerRef } = props;

  return (
    <div className="post-list-container">
      {Array.isArray(posts) &&
        posts?.map((post, index) => {
          return (
            <Post
              key={index}
              {...post}
              onClick={() => props.onClick && props.onClick(post.postId)}
            />
          );
        })}
      <div ref={observerRef} />
    </div>
  );
}
