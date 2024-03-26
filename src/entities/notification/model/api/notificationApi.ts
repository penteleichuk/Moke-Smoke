import { authInstance } from 'shared/api';

export const notificationApi = {
  async setToken(token: string) {
    return authInstance
      .post('/notification/user', {
        token,
      })
      .then(response => response.data);
  },
};
