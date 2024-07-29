'use client';

import { usePostsQuery } from '@/api/postApi';
import Post from '@/components/Post';
import SkeletonPost from '@/components/SkeletonPost';
import routes from '@/constants/routes';
import { PostData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PostContainer() {
  const { data, isFetched, refetch } = usePostsQuery({
    page: 0,
    size: 3,
  });

  const posts = data?.content;

  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`${routes.list}/${postId}`);
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="custom-container">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-10 text-6xl font-bold text-white">최신글</div>
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          {!isFetched &&
            Array.from({ length: 3 }).map((_, index) => {
              return <SkeletonPost key={index} />;
            })}
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
      </div>
    </div>
  );
}
