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
import { getLungs } from 'shared/lib/utils/getLungs';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetDashboardLungsStyle';

export const SheetDashboardLungs = React.memo(() => {
  const isQuitting = useAppSelector(getUserIsQuitting);
  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);

  const { [AppSheet.LUNGS]: lungsRef } = useContext(SheetCreateContext);
  const { t } = useTranslation();
  const { cn } = useTheme();

  const lungs = useMemo(() => {
    const smokeSum = getCigaretteSavings(isQuitting, smokeEveryDay);
    return getLungs(smokeSum);
  }, []);

  return (
    <Sheet name={AppSheet.LUNGS} ref={lungsRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.dashboard.lungs.title')}
        </CustomText>

        <Lottie style={styles.animation} source={Anims.Lungs} autoPlay loop />

        <CustomText
          size={TextSize.S_XL}
          style={[styles.primary, { color: cn('indigo.400', 'indigo.600') }]}>
          {t('home.dashboard.5.value', { value: lungs })}
        </CustomText>

        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.dashboard.lungs.descrpition')}
        </CustomText>
      </View>
    </Sheet>
  );
});
