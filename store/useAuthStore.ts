import { create } from 'zustand';

export interface AuthState {
  email: string;
  accessToken: string;
  setEmail: (email: string) => void;
  setAccessToken: (token: string) => void;
  reset: () => void;
}

const initialState = {
  email: '',
  accessToken: '',
};

const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  setEmail: (email: string) => set({ email }),
  setAccessToken: (token: string) => set({ accessToken: token }),
  reset: () => set(initialState),
}));

export default useAuthStore;
