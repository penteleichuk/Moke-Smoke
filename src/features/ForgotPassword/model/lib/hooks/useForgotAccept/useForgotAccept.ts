import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { showMessage } from 'react-native-flash-message';
import { forgotApi } from './../../../api/forgotApi';

export const useForgotAccept = () => {
  const { t } = useTranslation();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: forgotApi.accept,
    onSuccess: () => {
      showMessage({
        message: t('sheet.forgot.title'),
        description: t('sheet.forgot.showMessage.changeSuccess'),
        duration: 6000,
        type: 'success',
        floating: true,
        style: { borderRadius: 20 },
      });
    },
    onError: (e: any) => {
      if (e.message === 'Network Error') {
        showMessage({
          message: t(`message.error.${e.message}.title`),
          description: t(`message.error.${e.message}.message`),
          duration: 3000,
          type: 'danger',
          floating: true,
          style: { borderRadius: 20 },
        });
      } else {
        showMessage({
          message: t('sheet.forgot.title'),
          description: t('sheet.forgot.showMessage.tokenWrong'),
          duration: 3000,
          type: 'danger',
          floating: true,
          style: { borderRadius: 20 },
        });
      }
    },
  });

  return { mutate, isLoading: isPending, isSuccess };
};
