import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserIsQuitting, getUserSmokeEveryDay } from 'entities/user';
import Lottie from 'lottie-react-native';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { getCigaretteSavings } from 'shared/lib/utils/getCigaretteSavings';
import { getHelath } from 'shared/lib/utils/getHelath';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetDashboardHealthStyle';

export const SheetDashboardHealth = React.memo(() => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);

  const { [AppSheet.HEALTH]: healthRef } = useContext(SheetCreateContext);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const moreTime = useMemo(() => {
    const smokeSum = getCigaretteSavings(isQuitting, smokeEveryDay);
    return getHelath(smokeSum);
  }, []);

  return (
    <Sheet name={AppSheet.HEALTH} ref={healthRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.health.title')}
        </CustomText>

        <Lottie style={styles.animation} source={Anims.Health} autoPlay loop />

        <CustomText
          size={TextSize.S_XL}
          style={[styles.primary, { color: cn('indigo.400', 'indigo.600') }]}>
          {t('home.dashboard.3.value', { value: moreTime })}
        </CustomText>

        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.dashboard.health.descrpition')}
        </CustomText>
      </View>
    </Sheet>
  );
});
