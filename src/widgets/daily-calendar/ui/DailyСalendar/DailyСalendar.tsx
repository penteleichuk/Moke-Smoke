import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserWeekly } from 'entities/user';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { DailyItem } from './../DailyItem/DailyItem';
import { styles } from './DailyСalendarStyle';

export const DailyСalendar = React.memo(() => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const { [AppSheet.CHARTS_SMOKE]: chartRef } = useContext(SheetCreateContext);
  const userWeekly = useAppSelector(getUserWeekly);

  const onPressChartsHandler = useCallback(() => {
    chartRef?.current?.present();
  }, []);

  return (
    <PressableOpacity onPress={onPressChartsHandler}>
      <CustomText size={TextSize.S_2XL} style={{ color: cn('white', 'black') }}>
        {t('home.dashboard.title')}
      </CustomText>
      <FlatList
        data={userWeekly}
        horizontal
        renderItem={({ item, index }) => (
          <DailyItem key={index} dayIndex={index} weeklyDay={item} />
        )}
        contentContainerStyle={styles.contentContainer}
      />
    </PressableOpacity>
  );
});
