import { authInstance } from 'shared/instance';

export const activationApi = {
  async getToken() {
    return authInstance.get('/activation/token').then(res => res.data);
  },

  async accept(emailToken: string) {
    return authInstance
      .post('/activation/accept', { emailToken })
      .then(res => res.data);
  },
};
