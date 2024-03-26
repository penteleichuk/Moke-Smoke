import { authInstance } from 'shared/api';

export type ReportCreateType = {
  feed: string;
  commentId?: string;
};

export const ReportApi = {
  async create(data: ReportCreateType) {
    return authInstance.post('/report', data).then(res => res.data);
  },
};
