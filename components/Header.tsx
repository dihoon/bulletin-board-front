'use client';

import { useLogoutMutation } from '@/api/authApi';
import routes from '@/constants/routes';
import useRefreshToken from '@/hooks/useRefreshToken';
import useAuthStore from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Header = () => {
  const router = useRouter();

  const isLogined = useAuthStore((state) => !!state.accessToken);

  console.log(useAuthStore());

  console.log('isLogined : ', isLogined);

  const { isSuccess, isError } = useRefreshToken();

  const { mutate } = useLogoutMutation(router);

  const handleClickMenu = useCallback((menu: String) => {
    router.push(`${menu}`);
  }, []);

  const handleLogout = useCallback(() => {
    if (confirm('로그아웃 하시겠습니까?')) {
      mutate();
    }
  }, []);

  if (!isSuccess && !isError && !isLogined)
    return <div className="header-container" />;

  return (
    <div className="header-container">
      <li onClick={() => handleClickMenu('/')}>홈</li>
      {isLogined && (
        <>
          <li onClick={handleLogout}>로그아웃</li>
          <li onClick={() => handleClickMenu(routes.list)}>게시판</li>
          <li onClick={() => handleClickMenu(routes.myPage)}>마이페이지</li>
        </>
      )}
      {!isLogined && (
        <>
          <li onClick={() => handleClickMenu(routes.login)}>로그인</li>
          <li onClick={() => handleClickMenu(routes.signUp)}>회원가입</li>
        </>
      )}
    </div>
  );
};

export default Header;
