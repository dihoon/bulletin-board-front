'use client';

import { getPosts, usePostsQuery } from '@/api/postApi';
import PostList from '@/components/PostList';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { PostData } from '@/types/post';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function PostListContainer() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isFetching, isError } = usePostsQuery({ page, size: 10 });

  const postData = data?.content;

  console.log(data);

  const queryClient = useQueryClient();

  const loadMorePosts = () => {
    if (hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const observerRef = useIntersectionObserver({
    onIntersect: loadMorePosts,
    threshold: 1.0,
  });

  useEffect(() => {
    console.log(postData);
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
        queryFn: () => getPosts({ page: page + 1, size: 10 }),
      });
    }
  }, [postData, page, queryClient, hasMore]);

  return <PostList observerRef={observerRef} posts={posts} />;
}
