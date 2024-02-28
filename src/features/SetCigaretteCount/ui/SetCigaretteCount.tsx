import { getUserSmokeCountPack, setUserSmokePackCount } from 'entities/user';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { InputPicker } from 'shared/ui/InputPicker';
import { cigaretteCount } from './../model/const/cigarette-count';

export const SetCigaretteCount = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const currentCount = useAppSelector(getUserSmokeCountPack) || 0;

  const onSubmit = (value: string | number) => {
    dispatch(setUserSmokePackCount(value as number));
  };

  return (
    <InputPicker
      placeholder={t('settings.client.cigarette')}
      onSubmit={onSubmit}
      label={cigaretteCount}
      value={currentCount}
    />
  );
});
