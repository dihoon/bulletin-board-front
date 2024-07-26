'use client';

import { useUserInfoQuery } from '@/api/userApi';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function UserInfoContainer() {
  const router = useRouter();
  const isLogined = useAuthStore((state) => !!state.accessToken);

  console.log(isLogined);

  const { data, isLoading } = useUserInfoQuery({
    enabled: isLogined,
  });

  const handleAddPost = () => {
    router.push('/list/new');
  };

  if (!isLogined) return <div>loading...</div>;

  return (
    <div className="flex flex-1 flex-col px-12">
      <div className="user-info-container">
        <button className="custom-button" onClick={handleAddPost}>
          게시글 작성
        </button>
        {data?.email}
      </div>
    </div>
  );
}
