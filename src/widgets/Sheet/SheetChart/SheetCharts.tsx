import { AppSheet, SheetCreateContext } from 'app/providers/SheetProvider';
import { getUserWeekly } from 'entities/user';
import Lottie from 'lottie-react-native';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import * as Anims from 'shared/assets/anims';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { Sheet } from 'shared/ui/Sheet';
import { styles } from './SheetChartsStyle';

export const SheetCharts = () => {
  const { [AppSheet.CHARTS_SMOKE]: chartsRef } = useContext(SheetCreateContext);
  const weeklyies = useAppSelector(getUserWeekly);

  const { t } = useTranslation();
  const { cn } = useTheme();

  const weeklySum = useMemo(() => {
    let [success, warn, danger] = [0, 0, 0];

    weeklyies.forEach(e => {
      success += e.success;
      warn += e.wrong;
      danger += e.danger;
    });

    return [success, warn, danger];
  }, [weeklyies]);

  const weeklyIsset = useMemo(() => {
    return weeklySum[0] || weeklySum[1] || weeklySum[2];
  }, [weeklyies]);

  const weeklyData = useMemo(() => {
    return [
      {
        name: '- ' + t('home.charts.success'),
        population: weeklySum[0] || 0,
        color: cn('green.400'),
        legendFontColor: cn('white', 'black'),
        legendFontSize: 15,
      },
      {
        name: '- ' + t('home.charts.wrong'),
        population: weeklySum[1] || 0,
        color: cn('orange.200'),
        legendFontColor: cn('white', 'black'),
        legendFontSize: 15,
      },
      {
        name: '- ' + t('home.charts.danger'),
        population: weeklySum[2] || 0,
        color: cn('red.400'),
        legendFontColor: cn('white', 'black'),
        legendFontSize: 15,
      },
    ];
  }, [weeklyies, t('home.charts.success')]);

  return (
    <Sheet
      name={AppSheet.CHARTS_SMOKE}
      ref={chartsRef}
      detached={false}
      bottomInset={0}>
      <View style={styles.container}>
        <CustomText
          size={TextSize.S_2XL}
          weight={TextWeight.MEDIUM}
          style={{ color: cn('white', 'black') }}>
          {t('home.charts.title')}
        </CustomText>
        {!weeklyIsset ? (
          <View style={styles.content}>
            <Lottie
              style={styles.animation}
              source={Anims.Charts}
              autoPlay
              loop
              resizeMode="cover"
            />
            <CustomText
              style={[
                styles.subTitle,
                { color: cn('slate.300', 'slate.700') },
              ]}>
              {t('home.charts.empty')}
            </CustomText>
          </View>
        ) : (
          <PieChart
            data={weeklyData}
            width={300}
            height={180}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => cn('white', 'black'),
            }}
            paddingLeft={'0'}
            accessor={'population'}
            backgroundColor={'transparent'}
            absolute
          />
        )}
      </View>
    </Sheet>
  );
};
