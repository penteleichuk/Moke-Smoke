import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'shared/assets/icons';
import { getAppCurrencies } from 'shared/lib/intl/getAppCurrencies';
import { useAppDispatch } from 'shared/lib/state/dispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { LinkPicker } from 'shared/ui/LinkPicker';
import { getCurrency } from './../model/selectors/getCurrency/getCurrency';
import { setCurrency } from './../model/slices/currencySlice';
import { getCurrenciesLabels } from './../model/util/getCurrenciesLabels/getCurrenciesLabels';
import { getCurrenciesValues } from './../model/util/getCurrenciesValues/getCurrenciesValues';

export const CurrencyPicker = memo(() => {
  const { t } = useTranslation();
  const { cn } = useTheme();
  const dispatch = useAppDispatch();

  const currentCurrency = useAppSelector(getCurrency);

  const currencies = useMemo(() => {
    const label = getCurrenciesLabels(t('settings.info.sysCurrency'));
    const value = getCurrenciesValues();

    return { value, label };
  }, [currentCurrency]);

  const onPressCurrencyHandler = (value: string | number) => {
    if (value === 'system') {
      dispatch(setCurrency(getAppCurrencies()));
    } else {
      dispatch(setCurrency(value as string));
    }
  };

  return (
    <LinkPicker
      placeholder={t('settings.info.currency')}
      label={currencies.label}
      values={currencies.value}
      Icon={Icons.Currency}
      backgroundColorIcon={cn('yellow.800')}
      colorIcon={cn('yellow.300')}
      textColor={cn('white', 'black')}
      value={currentCurrency}
      variant={'string'}
      onSubmit={onPressCurrencyHandler}
    />
  );
});
