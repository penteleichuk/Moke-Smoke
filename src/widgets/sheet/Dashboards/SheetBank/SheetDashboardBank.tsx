import {
  AppSheet,
  SheetContextType,
  SheetCreateContext,
} from 'app/providers/SheetProvider';
import {
  getUserIsQuitting,
  getUserPricePack,
  getUserSmokeEveryDay,
} from 'entities/user';
import { getCurrency } from 'features/currency-picker';
import Lottie from 'lottie-react-native';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { getCurrencySymbol } from 'shared/lib/intl/getCurrencySymbol';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { getCigaretteSavings } from 'shared/lib/statistics/getCigaretteSavings';
import { getUnsmokedCigarettesCount } from 'shared/lib/statistics/getUnsmokedCigarettesCount';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { RowGroup } from 'shared/ui/RowGroup';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetDashboardBankStyle';

export const SheetDashboardBank = React.memo(() => {
  const { [AppSheet.BANK]: bankRef } =
    useContext<SheetContextType>(SheetCreateContext);

  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);
  const pricePack = useAppSelector(getUserPricePack);
  const currency = useAppSelector(getCurrency);

  const { cn } = useTheme();
  const { t } = useTranslation();

  const currencySymbol = useMemo(() => {
    return getCurrencySymbol(currency);
  }, [currency]);

  const savedMoney = useMemo(() => {
    const smokeSum = getCigaretteSavings(isQuitting, smokeEveryDay);
    return getUnsmokedCigarettesCount(smokeSum, pricePack, smokeEveryDay);
  }, []);

  return (
    <Sheet name={AppSheet.BANK} ref={bankRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.bank.title')}
        </CustomText>
        <Lottie style={styles.image} source={Anims.Bank} autoPlay loop />
        <RowGroup gap={10} marginTop={0}>
          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('indigo.400', 'indigo.600') }]}>
            {savedMoney} {currencySymbol}
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {pricePack} {currencySymbol}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type1')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {pricePack * 7} {currencySymbol}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type2')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {pricePack * 7 * 4} {currencySymbol}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type3')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {pricePack * 7 * 4 * 12} {currencySymbol}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type4')}
            </CustomText>
          </CustomText>
        </RowGroup>
      </View>
    </Sheet>
  );
});
