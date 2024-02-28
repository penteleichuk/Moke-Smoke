import { useQuery } from '@tanstack/react-query';
import { setUserEmailIsActivate } from 'entities/user';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { activationApi } from './../../../api/activationApi';

export const useIssueAccept = () => {
  let _emailToken: string = '';

  const setEmailToken = (emailToken: string) => {
    _emailToken = emailToken;
  };

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { data, error, isLoading, isError, isSuccess, refetch, fetchStatus } =
    useQuery({
      queryKey: ['token', _emailToken],
      queryFn: () => activationApi.accept(_emailToken),
      enabled: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 0,
    });

  if (isSuccess) {
    DisplayMessage({
      message: t('sheet.issue.title'),
      description: t('sheet.issue.showMessage.successAccept'),
      type: 'success',
    });

    dispatch(setUserEmailIsActivate(true));
  } else if (isError) {
    if (error.message === 'Network Error') {
      DisplayMessage({
        message: t(`message.error.${error.message}.title`),
        description: t(`message.error.${error.message}.message`),
        type: 'danger',
      });
    } else {
      DisplayMessage({
        message: t('sheet.issue.title'),
        description: t('sheet.issue.showMessage.tokenWrong'),
        type: 'danger',
      });
    }
  }

  return { data, isLoading, isError, setEmailToken, refetch, fetchStatus };
};
