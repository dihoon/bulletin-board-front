import { useRefreshAceesTokenMutation } from '@/api/authApi';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function useRefreshToken() {
  const authState = useAuthStore((state) => state);

  const { data, mutate, isSuccess, isError } = useRefreshAceesTokenMutation();

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      authState.setAccessToken(data.accessToken);
    }
  }, [data]);

  return { accessToken: data?.accessToken, isSuccess, isError };
}
