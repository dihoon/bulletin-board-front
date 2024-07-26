'use client';

import { usePostsQuery } from '@/api/postApi';
import Post from '@/components/Post';
import SkeletonPost from '@/components/SkeletonPost';
import routes from '@/constants/routes';
import { PostData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostContainer() {
  const { data, isLoading, refetch } = usePostsQuery({ page: 0, size: 3 });

  const posts = data?.content;

  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`${routes.list}/${postId}`);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex min-h-[500px] w-full max-w-[1080px] gap-4">
      {isLoading &&
        Array.from({ length: 3 }).map((_, index) => (
          <SkeletonPost key={index} />
        ))}
      {Array.isArray(posts) &&
        posts?.map((post: PostData, index: number) => {
          return (
            <Post
              key={index}
              {...post}
              onClick={() => handleClickPost(post.postId)}
            />
          );
        })}
    </div>
  );
}
