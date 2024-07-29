'use client';

import { usePostsQuery } from '@/api/postApi';
import PostList from '@/components/PostList';
import routes from '@/constants/routes';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { PostData } from '@/types/post';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostListContainer() {
  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { data, isFetching, refetch } = usePostsQuery({ page, size: 10 });

  const postData = data?.content;

  const router = useRouter();

  const handleClickPost = (postId: number) => {
    router.push(`${routes.list}/${postId}`);
  };

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
    if (hasMore) {
      refetch();
    }
  }, [page]);

  useEffect(() => {
    if (postData) {
      setPosts((prev) => [...prev, ...postData]);

      if (postData.length < 10) setHasMore(false);
    }
  }, [data]);

  return (
    <PostList
      observerRef={observerRef}
      posts={posts}
      onClick={handleClickPost}
    />
  );
}
