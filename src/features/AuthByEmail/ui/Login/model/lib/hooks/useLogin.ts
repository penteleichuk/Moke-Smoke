import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { DisplayMessage, DisplayMessageType } from 'shared/ui/DisplayMessage';
import { AuthApi } from './../../../../../../../entities/auth/model/api/authApi';

export const useLogin = () => {
  const { t } = useTranslation();

  const { mutate, data, isPending, isSuccess, reset } = useMutation({
    mutationFn: AuthApi.login,
    onSuccess: () => {
      DisplayMessage({
        message: t('settings.auth.login'),
        description: t('sheet.login.showMessage.success'),
        type: DisplayMessageType.SUCCESS,
      });
    },
    onError: (e: any) => {
      if (e.message === 'Network Error') {
        DisplayMessage({
          message: t(`message.error.${e.message}.title`),
          description: t(`message.error.${e.message}.message`),
          type: DisplayMessageType.DANGER,
        });
      } else {
        DisplayMessage({
          message: t('settings.auth.login'),
          description: t('sheet.login.showMessage.emailWrong'),
          type: DisplayMessageType.DANGER,
        });
      }
    },
  });

  return { mutate, isLoading: isPending, isSuccess, reset, data };
};
