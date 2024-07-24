'use client';

import { usePostsQuery } from '@/api/postApi';
import Post from '@/components/Post';
import SkeletonPost from '@/components/SkeletonPost';
import { PostData } from '@/types/post';

export default function PostContainer() {
  const { data, isLoading } = usePostsQuery({ page: 0, size: 3 });

  const posts = data?.content;

  return (
    <div className="flex min-h-[500px] w-full max-w-[1080px] gap-4">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      {Array.isArray(posts) &&
        posts?.map((post: PostData, index: number) => {
          return <Post key={index} {...post} />;
        })}
    </div>
  );
}
