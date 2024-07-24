import ClientProvider from '@/components/ClientProvider';
import UserInfoContainer from '@/containers/UserInfoContainer';
import UserPostsContainer from '@/containers/UserPostsContainer';

export default function MyPage() {
  return (
    <div className="h-full">
      <ClientProvider>
        <div className="flex h-full">
          <UserPostsContainer />
          <UserInfoContainer />
        </div>
      </ClientProvider>
    </div>
  );
}
