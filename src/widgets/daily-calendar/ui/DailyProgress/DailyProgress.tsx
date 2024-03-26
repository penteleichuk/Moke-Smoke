import { getUserIsQuitting } from 'entities/user';
import moment from 'moment';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DimensionValue, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './DailyProgressStyle';

export const EVENT_DAYS = 22;

export const DailyProgress = () => {
  const { cn } = useTheme();
  const { t } = useTranslation();

  const isQuitting = useAppSelector(getUserIsQuitting);

  const count = useMemo(() => {
    if (!isQuitting) {
      return 0;
    }
    return +moment().diff(isQuitting, 'days');
  }, [isQuitting]);

  const width = (((count / EVENT_DAYS) * 100).toString() +
    '%') as DimensionValue;

  return (
    <View>
      <CustomText size={TextSize.S_2XL} style={{ color: cn('white', 'black') }}>
        {t('home.dashboard.quite')}
      </CustomText>
      <View style={styles.container}>
        <View style={styles.text}>
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'slate.700') }}>
            {count}
            {t('times.d')}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'slate.700') }}>
            {' / '}
          </CustomText>
          <CustomText
            size={TextSize.S_LG}
            weight={TextWeight.MEDIUM}
            style={{ color: cn('white', 'slate.700') }}>
            {EVENT_DAYS}
            {t('times.d')}
          </CustomText>
        </View>
        <View
          style={[
            styles.progress,
            {
              backgroundColor: cn('slate.800', 'white'),
              borderColor: cn('slate.800', 'slate.300'),
            },
          ]}>
          <LinearGradient
            style={[
              styles.progressLine,
              { width, backgroundColor: cn('violet.600', 'indigo.300') },
            ]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 0.9 }}
            locations={[0.0, 0.9]}
            colors={[
              cn('violet.600', 'violet.400'),
              cn('indigo.700', 'indigo.300'),
            ]}
          />
        </View>
      </View>
    </View>
  );
};
