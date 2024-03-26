import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserSmokeEveryDay } from 'entities/user';
import { getProgressId } from 'features/open-card-progres';
import Lottie from 'lottie-react-native';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Anims from 'shared/assets/anims';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { RowGroup } from 'shared/ui/RowGroup';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetProgressStyle';

export const SheetProgress = React.memo(() => {
  const { [AppSheet.PROGRESS]: progressRef } = useContext(SheetCreateContext);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const smokeEveryDay = useAppSelector(getUserSmokeEveryDay);
  const progressId = useAppSelector(getProgressId);

  return (
    <Sheet name={AppSheet.PROGRESS} ref={progressRef}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('help.progress.day')} {progressId + 1}
        </CustomText>
        <Lottie style={styles.animation} source={Anims.King} autoPlay loop />
        <RowGroup gap={10}>
          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {t('help.progress.param_1', {
              value: smokeEveryDay * (progressId + 1),
            })}
          </CustomText>

          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {t('help.progress.param_2', {
              value: (((progressId + 1) / 21) * 100).toFixed(2),
            })}
          </CustomText>

          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {t('help.progress.param_3', {
              value: (progressId + 1) * 214,
            })}
          </CustomText>

          <CustomText
            size={TextSize.S_LG}
            style={[styles.text, { color: cn('white', 'black') }]}>
            {t('help.progress.param_4', {
              value: progressId + 1,
            })}
          </CustomText>
        </RowGroup>
      </View>
    </Sheet>
  );
});
