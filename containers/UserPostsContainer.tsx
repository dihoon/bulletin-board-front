'use client';

import { useUserPostsQuery } from '@/api/userApi';
import PostList from '@/components/PostList';
import routes from '@/constants/routes';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useAuthStore from '@/store/useAuthStore';
import { PostData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function UserPostsContainer() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const isLogined = useAuthStore((state) => !!state.accessToken);

  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`${routes.list}/${postId}`);
  };

  const { data, isFetching, refetch } = useUserPostsQuery(
    {
      page,
      size: 10,
    },
    { enabled: isLogined }
  );

  const postData = data?.content;

  const loadMorePosts = () => {
    if (hasMore && !isFetching && isLogined) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const observerRef = useIntersectionObserver({
    onIntersect: loadMorePosts,
    threshold: 1.0,
  });

  useEffect(() => {
    if (hasMore) {
      refetch();
    }
  }, [page]);

  useEffect(() => {
    if (postData) {
      setPosts((prev) => {
        const newPosts = postData.filter(
          (newPost: PostData) =>
            !prev.some((prevPost) => prevPost.postId === newPost.postId)
        );
        return [...newPosts, ...prev];
      });

      if (postData.length < 10) setHasMore(false);
    }
  }, [data]);

  return (
    <div className="scrollbar-invisible flex-[3_1_0] overflow-hidden overflow-y-auto">
      <PostList
        observerRef={observerRef}
        posts={posts}
        onClick={handleClickPost}
      />
    </div>
  );
}
