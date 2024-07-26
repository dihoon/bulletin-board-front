import ClientProvider from '@/components/ClientProvider';
import PostAddContainer from '@/containers/PostAddContainer';

export default function newPostPage() {
  return (
    <div className="custom-scrollbar h-full overflow-y-auto">
      <ClientProvider>
        <PostAddContainer />
      </ClientProvider>
    </div>
  );
}
