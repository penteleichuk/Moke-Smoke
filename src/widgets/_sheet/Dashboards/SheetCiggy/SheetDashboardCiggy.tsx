import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserIsQuitting, getUserSmokeEveryDay } from 'entities/user';
import Lottie from 'lottie-react-native';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { RowGroup } from 'shared/ui/RowGroup';
import { Sheet } from 'shared/ui/Sheet';
import { getCigaretteSavings } from 'shared/utils/getCigaretteSavings';
import { styles } from './SheetDashboardCiggyStyle';

export const SheetDashboardCiggy = React.memo(() => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);

  const { [AppSheet.NO_USE_CIGARETTES]: noUseCigRef } =
    useContext(SheetCreateContext);

  const { cn } = useTheme();
  const { t } = useTranslation();

  const moreTime = useMemo(() => {
    return getCigaretteSavings(isQuitting, smokeEveryDay);
  }, []);

  return (
    <Sheet name={AppSheet.NO_USE_CIGARETTES} ref={noUseCigRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.ciggy.title')}
        </CustomText>

        <Lottie style={styles.animation} source={Anims.Happy} autoPlay loop />

        <RowGroup gap={10} marginTop={0}>
          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('indigo.400', 'indigo.600') }]}>
            {t('home.dashboard.2.value', { value: moreTime })}
          </CustomText>
          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {smokeEveryDay}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type1')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {smokeEveryDay * 7}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type2')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {smokeEveryDay * 30}
            <CustomText
              size={TextSize.S_XL}
              style={{ color: cn('slate.300', 'slate.700') }}>
              {t('detached.dashboard.bank.type3')}
            </CustomText>
          </CustomText>

          <CustomText
            size={TextSize.S_XL}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {smokeEveryDay * 366}
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
