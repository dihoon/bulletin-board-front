'use client';

import { getUserPosts, useUserPostsQuery } from '@/api/userApi';
import PostList from '@/components/PostList';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useAuthStore from '@/store/useAuthStore';
import { PostData } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function UserPostsContainer() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const isLogined = !!accessToken;

  const { data, isFetching } = useUserPostsQuery({
    page,
    size: 10,
  });

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
    if (postData) {
      setPosts((prevPosts) => [...prevPosts, ...postData]);

      if (postData.length < 10) {
        setHasMore(false);
      }
    }
  }, [postData]);

  useEffect(() => {
    if (hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['posts', { page: page + 1, size: 10 }],
        queryFn: () => getUserPosts({ page: page + 1, size: 10 }),
      });
    }
  }, [page, queryClient, hasMore]);

  return (
    <div className="flex-[3_1_0]">
      <PostList observerRef={observerRef} posts={posts} />
    </div>
  );
}
