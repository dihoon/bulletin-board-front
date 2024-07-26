import ClientProvider from '@/components/ClientProvider';
import PostDetailContainer from '@/containers/PostDetailContainer';

interface ParamsProps {
  postId: string;
}

export default function PostDetailPage({ params }: { params: ParamsProps }) {
  const postId = params.postId;

  return (
    <div className="custom-scrollbar h-full overflow-y-auto">
      <ClientProvider>
        <PostDetailContainer postId={postId} />
      </ClientProvider>
    </div>
  );
}
