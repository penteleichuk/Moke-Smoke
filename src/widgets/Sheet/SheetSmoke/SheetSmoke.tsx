import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetSmokeStyle';

export const SheetSmoke = React.memo(() => {
  const { [AppSheet.SMOKE]: smokeRef } = useContext(SheetCreateContext);

  const { t } = useTranslation();
  const { cn } = useTheme();

  return (
    <Sheet name={AppSheet.SMOKE} ref={smokeRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.smoke.title')}
        </CustomText>
        <Lottie style={styles.animation} source={Anims.Bad} autoPlay loop />
        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.smoke.description')}
        </CustomText>
      </View>
    </Sheet>
  );
});
