import { UserMotivationsType } from 'entities/user';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { ColorPaletteType, useTheme } from 'shared/lib/theme';
import { CustomText, TextSize } from 'shared/ui/CustomText';
import { getWeekDay } from 'shared/utils/statistics/getWeekDay';
import { styles } from './DailyItemStyle';

type DailyItemType = {
  weeklyDay: UserMotivationsType;
  dayIndex: number;
};

export const DailyItem = memo(({ dayIndex, weeklyDay }: DailyItemType) => {
  const { t } = useTranslation();
  const { cn } = useTheme();

  const isActive = useMemo(() => getWeekDay() === dayIndex, []);

  const fillIconMood = useMemo(() => {
    const moodClasses = {
      danger: 'red.400',
      warning: 'orange.200',
      success: 'green.400',
      default: 'slate.400',
    };

    const mood =
      weeklyDay.danger > 0
        ? 'danger'
        : weeklyDay.wrong > weeklyDay.success
          ? 'warning'
          : weeklyDay.wrong < weeklyDay.success
            ? 'success'
            : 'default';

    return cn(moodClasses[mood] as ColorPaletteType);
  }, [weeklyDay]);

  return (
    <View
      style={[
        styles.wrapper,
        {
          backgroundColor: cn(
            isActive ? 'slate.700' : 'slate.800',
            isActive ? 'white' : 'slate.100',
          ),
          borderColor: cn('slate.800', 'slate.300'),
        },
      ]}>
      <Icons.Check
        fill={fillIconMood}
        width={moderateScale(25)}
        height={moderateScale(25)}
      />
      <CustomText
        size={TextSize.S_BASE}
        style={[styles.text, { color: cn('slate.200', 'black.100') }]}>
        {t(`calendar.${dayIndex + 1}`)}
      </CustomText>
    </View>
  );
});
