import { getUserSmokeEveryDay, setUserSmokeEveryDay } from 'entities/user';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { InputPicker } from 'shared/ui/InputPicker';
import { cigaretteDay } from './../model/const/cigarette-day';

export const SetCigaretteDay = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentCigarette = useAppSelector(getUserSmokeEveryDay) || 0;

  const onSubmit = (value: string | number) => {
    dispatch(setUserSmokeEveryDay(value as number));
  };

  return (
    <InputPicker
      placeholder={t('settings.client.cigarette')}
      onSubmit={onSubmit}
      label={cigaretteDay}
      value={currentCigarette}
    />
  );
});
