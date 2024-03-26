import { AxiosResponse } from 'axios';
import { authInstance, instance } from 'shared/api';
import {
  AuthLoginResponse,
  AuthSocial,
  LoginType,
  RegistrationType,
} from './../types/auth';

export const AuthApi = {
  async login(args: LoginType) {
    return instance
      .post<any, AxiosResponse<AuthLoginResponse>>('/auth/login', args)
      .then(response => response.data);
  },

  async initialized(user: UserSchema) {
    const { avatarUrl: _, ...res } = user;

    return authInstance
      .post('/user/init', {
        ...res,
        toCurrentTime: new Date(),
      })
      .then(response => response.data);
  },

  async registration(args: RegistrationType) {
    return instance
      .post<any, AxiosResponse<AuthLoginResponse>>('/auth/register', args)
      .then(response => response.data);
  },

  async apple(args: AuthSocial) {
    return instance
      .post<any, AxiosResponse<AuthLoginResponse>>('/auth/apple/login', args)
      .then(response => response.data);
  },

  async google(args: AuthSocial) {
    return instance
      .post<any, AxiosResponse<AuthLoginResponse>>('/auth/google/login', args)
      .then(response => response.data);
  },
};
