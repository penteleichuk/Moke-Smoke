import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const INSTANCE_TIMEOUT = 1500;
const INSTANCE_HEADER = {
  'Content-Type': 'application/json',
};

export const authInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: INSTANCE_TIMEOUT,
  headers: INSTANCE_HEADER,
});

authInstance.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

authInstance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await getNewToken();
        return authInstance.request(originalRequest);
      } catch (err: any) {
        if (errorCatch(err) === 'jwt expired') {
          AsyncStorage.removeItem('accessToken');
          AsyncStorage.removeItem('refreshToken');
        }
      }
    }

    throw error;
  },
);

type TokenResponse = {
  refreshToken: string;
  accessToken: string;
};

export const errorCatch = (error: any) => {
  return error.response && error.response.data
    ? typeof error.response.data.message === 'object'
      ? error.response.data.message[0]
      : error.response.data.message
    : error.message;
};

export const getNewToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');

  const response = await axios.post<TokenResponse>(
    `${API_BASE_URL}/auth/access-token`,
    { refreshToken },
  );

  if (response.data.accessToken) {
    await AsyncStorage.setItem('accessToken', response.data.accessToken);
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
  }

  return response;
};
