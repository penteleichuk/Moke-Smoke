import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserIsQuitting, getUserSmokeEveryDay } from 'entities/user';
import Lottie from 'lottie-react-native';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppSelector } from 'shared/lib/state/selector/useAppSelector';
import { getCigaretteSavings } from 'shared/lib/statistics/getCigaretteSavings';
import { getMoreTime } from 'shared/lib/statistics/getMoreTime';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetDashboardMoreTimeStyle';

export const SheetDashboardMoreTime = React.memo(() => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);

  const { [AppSheet.LONGEViTY]: longevityRef } = useContext(SheetCreateContext);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const moreTime = useMemo(() => {
    const smokeSum = getCigaretteSavings(isQuitting, smokeEveryDay);
    return getMoreTime(smokeSum);
  }, []);

  return (
    <Sheet name={AppSheet.LONGEViTY} ref={longevityRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.more.time.title')}
        </CustomText>

        <Lottie
          style={styles.animation}
          source={Anims.MoreTime}
          autoPlay
          loop
        />

        <CustomText
          size={TextSize.S_XL}
          style={[styles.primary, { color: cn('indigo.400', 'indigo.600') }]}>
          {t('home.dashboard.1.value', { value: moreTime })}
        </CustomText>

        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.dashboard.more.time.descrpition')}
        </CustomText>
      </View>
    </Sheet>
  );
});
