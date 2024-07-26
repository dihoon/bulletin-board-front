import { useRefreshAceesTokenMutation } from '@/api/authApi';
import useAuthStore from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function useRefreshToken() {
  const state = useAuthStore.getState();
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data, mutate, isSuccess, isError } = useRefreshAceesTokenMutation();

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      state.setEmail(data.email);
      state.setAccessToken(accessToken);
    }
  }, [data]);

  return { accessToken: data?.accessToken, isSuccess, isError };
}
