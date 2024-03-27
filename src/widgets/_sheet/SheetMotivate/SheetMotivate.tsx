import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetMotivateStyle';

export const SheetMotivate = React.memo(() => {
  const { [AppSheet.MOTIVATE]: motivateRef } = useContext(SheetCreateContext);

  const { cn } = useTheme();
  const { t } = useTranslation();

  return (
    <Sheet name={AppSheet.MOTIVATE} ref={motivateRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('detached.motivate.title')}
        </CustomText>
        <Lottie style={styles.animation} source={Anims.Friend} autoPlay loop />
      </View>
    </Sheet>
  );
});
