import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { UserApi } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { DisplayMessage } from 'shared/ui/DisplayMessage';

export const useChangePassword = () => {
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: UserApi.changePassword,
    onSuccess: () => {
      DisplayMessage({
        message: t('settings.auth.change'),
        description: t('sheet.change.showMessage.success'),
        type: 'success',
      });
    },
    onError: (e: Error | AxiosError) => {
      if (e.message === 'Network Error') {
        DisplayMessage({
          message: t(`message.error.${e.message}.title`),
          description: t(`message.error.${e.message}.message`),
          type: 'danger',
        });
      } else {
        DisplayMessage({
          message: t('settings.auth.change'),
          description: t('sheet.change.showMessage.error'),
          type: 'danger',
        });
      }
    },
  });

  return { mutate, isLoading: isPending };
};
