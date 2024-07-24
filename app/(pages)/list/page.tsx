import ClientProvider from '@/components/ClientProvider';
import PostListContainer from '@/containers/PostListContainer';

export default function ListPage() {
  return (
    <div className="h-full">
      <ClientProvider>
        <PostListContainer />
      </ClientProvider>
    </div>
  );
}
