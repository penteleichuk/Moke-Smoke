import { authInstance } from 'shared/instance';

export const UserApi = {
  async info() {
    return authInstance.get('/user/info');
  },

  async init(user: any) {
    const { avatarUrl: _, ...res } = user;

    const response = await authInstance.post('/user/init', {
      ...res,
      toCurrentTime: new Date(),
    });
    return response.data;
  },

  async changePassword(data: ChangePasswordDto) {
    return authInstance
      .post('/user/change-password', data)
      .then(res => res.data);
  },

  async removeUser() {
    return authInstance.delete('/user/delete');
  },
};

export type ChangePasswordDto = {
  password: string;
  newPassword: string;
  repeatPassword: string;
};
