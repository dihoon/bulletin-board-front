import PostDetailContainer from '@/containers/PostDetailContainer';

interface ParamsProps {
  postId: string;
}

export default function PostDetailPage({ params }: { params: ParamsProps }) {
  const postId = params.postId;

  return (
    <div className="flex-1 overflow-hidden">
      <PostDetailContainer postId={postId} />
    </div>
  );
}
