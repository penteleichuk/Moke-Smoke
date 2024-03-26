import { AxiosResponse } from 'axios';
import { authInstance, instance } from 'shared/api';

export const InvitedApi = {
  async install() {
    return instance
      .post<any, AxiosResponse<InstallResponseType>>('/invite/install')
      .then(res => res.data);
  },

  async activate(args: ActivateInvitedProps) {
    return authInstance.post('/invite/activate', args).then(res => res.data);
  },
};

type InstallResponseType = {
  _id: string;
  code: string;
};

export type ActivateInvitedProps = {
  installedId?: string;
  code: string;
  country: string;
};
