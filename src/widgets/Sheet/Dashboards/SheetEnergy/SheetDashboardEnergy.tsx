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
import { getEnergy } from 'shared/lib/utils/getEnergy';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetDashboardEnergyStyle';

export const SheetDashboardEnergy = React.memo(() => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);

  const { [AppSheet.ENERGY]: energyRef } = useContext(SheetCreateContext);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const energy = useMemo(() => {
    const smokeSum = getCigaretteSavings(isQuitting, smokeEveryDay);
    return getEnergy(smokeSum);
  }, []);

  return (
    <Sheet name={AppSheet.ENERGY} ref={energyRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.energy.title')}
        </CustomText>

        <Lottie style={styles.animation} source={Anims.Energy} autoPlay loop />

        <CustomText
          size={TextSize.S_XL}
          style={[styles.primary, { color: cn('indigo.400', 'indigo.600') }]}>
          {t('home.dashboard.4.value', { value: energy })}
        </CustomText>

        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.dashboard.energy.description')}
        </CustomText>
      </View>
    </Sheet>
  );
});
