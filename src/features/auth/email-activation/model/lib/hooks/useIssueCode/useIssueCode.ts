import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { activationApi } from './../../../api/activationApi';

export const useIssueCode = () => {
  const { t } = useTranslation();

  const { mutate, isPending, error } = useMutation({
    mutationFn: activationApi.getToken,
    onSuccess: () => {
      DisplayMessage({
        message: t('sheet.issue.title'),
        description: t('sheet.issue.showMessage.successSend'),
        type: 'success',
      });
    },
    onError: (e: any) => {
      if (e.message === 'Network Error') {
        DisplayMessage({
          message: t(`message.error.${e.message}.title`),
          description: t(`message.error.${e.message}.message`),
          type: 'danger',
        });
      } else {
        DisplayMessage({
          message: t('sheet.issue.input.token'),
          description: t('sheet.issue.showMessage.requestLimit'),
          type: 'danger',
        });
      }
    },
  });

  return { mutate, isLoading: isPending, error };
};
