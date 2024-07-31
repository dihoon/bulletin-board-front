'use client';

import { useDeleteAccountMutation } from '@/api/authApi';
import { useUserInfoQuery } from '@/api/userApi';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function UserInfoContainer() {
  const router = useRouter();
  const isLogined = useAuthStore((state) => !!state.accessToken);

  const { data } = useUserInfoQuery({
    enabled: isLogined,
  });

  const deleteAccountMutation = useDeleteAccountMutation();

  const handleAddPost = () => {
    router.push('/list/new');
  };

  const handleDeleteAccount = async () => {
    if (confirm('정말 회원 탈퇴하시겠습니까?')) {
      await deleteAccountMutation.mutateAsync();
      router.push('/');
    }
  };

  if (!isLogined) return <div>loading...</div>;

  return (
    <div className="mb-6 flex flex-col px-6 lg:m-0 lg:flex-1">
      <div className="user-info-container">
        <button className="custom-button" onClick={handleAddPost}>
          게시글 작성
        </button>
        <button className="custom-button" onClick={handleDeleteAccount}>
          회원 탈퇴
        </button>
        <span className="">{data?.email}</span>
      </div>
    </div>
  );
}
