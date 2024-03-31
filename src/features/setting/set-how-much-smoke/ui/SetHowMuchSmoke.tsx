import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { InputPicker } from 'shared/ui/InputPicker';
import { howMuchValues } from './../model/const/howMuch';
import { getHowMuchSmoking } from './../model/selectors/getHowMuchSmoking';
import { setValueHowMuch } from './../model/slices/howMuchSlice';

export const SetHowMuchSmoke = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const howMuchValue = useAppSelector(getHowMuchSmoking);

  const onSubmitHowMuchCount = (value: string | number) => {
    dispatch(setValueHowMuch(+value));
  };

  const howMuchDisplayValue = useMemo(() => {
    return howMuchValue > 60
      ? `${howMuchValue / 60} ${t('times.h')}.`
      : `${howMuchValue} ${t('times.m')}.`;
  }, [howMuchValue]);

  const howMuchLavel = useMemo(() => {
    return howMuchValues.map(el =>
      el > 60 ? `${el / 60} ${t('times.h')}.` : `${el} ${t('times.m')}.`,
    );
  }, []);

  return (
    <InputPicker
      placeholder={t('settings.client.howOffen')}
      onSubmit={onSubmitHowMuchCount}
      label={howMuchLavel}
      values={howMuchValues}
      displayValue={howMuchDisplayValue}
      value={howMuchValue}
    />
  );
});
