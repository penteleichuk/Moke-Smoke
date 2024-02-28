import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetNoSmokeStyle';

export const SheetNoSmoke = React.memo(() => {
  const { [AppSheet.NO_SMOKE]: noSmokeRef } = useContext(SheetCreateContext);

  const { cn } = useTheme();
  const { t } = useTranslation();

  return (
    <Sheet name={AppSheet.NO_SMOKE} ref={noSmokeRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.nosmoke.title')}
        </CustomText>
        <Lottie style={styles.animation} source={Anims.Coin} autoPlay loop />
        <CustomText
          size={TextSize.S_XL}
          style={[styles.text, { color: cn('white', 'black') }]}>
          {t('detached.nosmoke.description')}
        </CustomText>
      </View>
    </Sheet>
  );
});
