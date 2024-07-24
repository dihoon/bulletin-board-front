'use client';

import { useUserInfoQuery } from '@/api/userApi';

export default function UserInfoContainer() {
  const { data, isLoading } = useUserInfoQuery();

  if (isLoading) return <div>loading...</div>;

  return (
    <div className="flex-1 px-12">
      <div className="user-info-container">{data?.email}</div>
    </div>
  );
}
