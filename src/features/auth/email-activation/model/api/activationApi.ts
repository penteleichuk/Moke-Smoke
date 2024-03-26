import { authInstance } from 'shared/api';

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
