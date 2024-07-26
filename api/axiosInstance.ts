import useAuthStore from '@/store/useAuthStore';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore.getState();
    const token = authStore.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const authStore = useAuthStore.getState();

    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/api/auth/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          const newAccessToken = response.data.token;
          authStore.setAccessToken(newAccessToken);

          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        }
      } catch (e) {
        authStore.setAccessToken('');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
