import ClientProvider from '@/components/ClientProvider';
import PostContainer from '@/containers/PostContainer';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-10 text-6xl font-bold text-white">최신글</div>
      <ClientProvider>
        <PostContainer />
      </ClientProvider>
    </div>
  );
}
