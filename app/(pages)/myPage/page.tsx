import UserInfoContainer from '@/containers/UserInfoContainer';
import UserPostsContainer from '@/containers/UserPostsContainer';

export default function MyPage() {
  return (
    <div className="flex h-[calc(100vh-72px)] flex-col-reverse overflow-hidden lg:flex-row">
      <UserPostsContainer />
      <UserInfoContainer />
    </div>
  );
}
