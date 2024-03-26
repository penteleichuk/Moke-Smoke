import { authInstance } from 'shared/api';

export const AvatarApi = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },

  async upload(uri: string | Blob, name: string, type: string) {
    const request = new FormData().append('avatar', {
      uri,
      type,
      name,
    });

    return authInstance
      .post('/avatar', request, {
        headers: this.headers,
        timeout: 12000,
      })
      .then(({ data }: any) => {
        return data.avatarUrl;
      });
  },
};
