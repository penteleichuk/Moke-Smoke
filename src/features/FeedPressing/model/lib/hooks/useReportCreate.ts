import { useQueryClient } from '@tanstack/react-query';
import { ReportApi, ReportCreateType } from './../../api/ReportApi';

export const QUERY_KEY_REPORT_CREATE = 'QUERY_KEY_REPORT_CREATE' as const;

export const useReportCreate = () => {
  const queryClient = useQueryClient();

  const create = async (data: ReportCreateType) => {
    try {
      await queryClient.fetchQuery({
        queryKey: [QUERY_KEY_REPORT_CREATE, data.feed],
        queryFn: () => ReportApi.create(data),
      });

      return { status: 'success', type: undefined };
    } catch (err: any) {
      return { status: 'error', type: err?.response?.data?.error };
    }
  };

  return { create };
};
