import { authInstance } from 'shared/instance';

export const forgotApi = {
  async sendToken(email: string) {
    return authInstance.post('/forgot/token', { email }).then(res => res.data);
  },

  async accept(data: ForgotDto) {
    return authInstance.post('/forgot/accept', data).then(res => res.data);
  },
};

type ForgotDto = {
  email: string;
  forgotToken: string;
  password: string;
};
