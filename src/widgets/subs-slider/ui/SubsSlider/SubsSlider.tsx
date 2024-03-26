import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import * as Icons from 'shared/assets/icons';
import { SCREEN_WIDTH } from 'shared/config/dimensions';
import { useTheme } from 'shared/lib/theme';
import { SubsSliderItem } from './../SubsSliderItem/SubsSliderItem';
import { styles } from './SubsSliderStyle';

const ROW_COUNT = 3;
const ANIMATION_INTERVAL = 3000;

export const SubsSlider = React.memo(() => {
  const { t } = useTranslation();
  const { theme, cn } = useTheme();

  const icons = useMemo(() => {
    return [
      {
        Icon: Icons.CardsSub,
        colorIcon: cn('rose.200'),
        backgroundColorIcon: cn('rose.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.DoubleSub,
        colorIcon: cn('blue.200'),
        backgroundColorIcon: cn('blue.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.EventsSub,
        colorIcon: cn('teal.200'),
        backgroundColorIcon: cn('teal.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.LearnSub,
        colorIcon: cn('amber.200'),
        backgroundColorIcon: cn('amber.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.NoAdsSub,
        colorIcon: cn('orange.200'),
        backgroundColorIcon: cn('orange.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.TaskSub,
        colorIcon: cn('red.200'),
        backgroundColorIcon: cn('red.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.Hypnosis,
        colorIcon: cn('emerald.200'),
        backgroundColorIcon: cn('emerald.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.Pedometer,
        colorIcon: cn('indigo.200'),
        backgroundColorIcon: cn('indigo.600'),
        textColor: cn('white', 'black'),
      },
      {
        Icon: Icons.Mark,
        colorIcon: cn('violet.200'),
        backgroundColorIcon: cn('violet.600'),
        textColor: cn('white', 'black'),
      },
    ];
  }, [theme]);

  const items = useMemo(() => {
    const input = t('sheet.premium.information', {
      returnObjects: true,
    }) as string[];

    const chunkSize = ROW_COUNT;
    const output = Array.from(
      { length: Math.ceil(input.length / chunkSize) },
      (_, index) => input.slice(index * chunkSize, (index + 1) * chunkSize),
    );

    return output;
  }, [ROW_COUNT]);

  return (
    <Carousel
      autoPlay={true}
      autoPlayInterval={ANIMATION_INTERVAL}
      width={SCREEN_WIDTH}
      height={ROW_COUNT * 60}
      data={items}
      scrollAnimationDuration={2000}
      renderItem={({ index }) => (
        <View style={styles.container}>
          {[...Array(ROW_COUNT).keys()].map((_, i) => (
            <SubsSliderItem
              key={index * ROW_COUNT + i}
              text={items[index][i]}
              {...icons[index * ROW_COUNT + i]}
            />
          ))}
        </View>
      )}
    />
  );
});
