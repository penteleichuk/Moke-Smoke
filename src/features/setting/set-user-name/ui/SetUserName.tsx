import { getUserName, setUserName } from 'entities/user';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { InputScreen } from 'shared/ui/InputScreen';
import { usernameValidation } from './../model/validations/set-username';

export const SetUserName = memo(() => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const name = useAppSelector(getUserName);

  const onSubmit = (value: string | number) => {
    dispatch(setUserName(value as string));
  };

  return (
    <InputScreen
      autoCapitalize={'words'}
      autoComplete={'off'}
      autoCorrect={false}
      name={'name'}
      placeholder={t('settings.client.name')}
      value={name}
      onSubmitButton={onSubmit}
      schema={usernameValidation}
    />
  );
});
