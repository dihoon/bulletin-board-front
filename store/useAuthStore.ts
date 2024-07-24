import { create } from 'zustand';

export interface AuthState {
  accessToken: string;
  setAccessToken: (token: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: '',
  setAccessToken: (token: string) => set({ accessToken: token }),
}));

export default useAuthStore;
