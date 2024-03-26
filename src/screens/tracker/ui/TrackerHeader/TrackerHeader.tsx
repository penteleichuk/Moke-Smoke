import { calculateDistance } from 'entities/health';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColorValue, StyleSheet, View } from 'react-native';
import { moderateScale } from 'shared/config/dimensions';
import { TrackerHeaderItem } from './TrackerHeaderItem';

type TrackerHeaderType = {
  step: number;
  titleColor: ColorValue;
  subtitleColor: ColorValue;
  distance: number;
  minutes: number;
};

export const TrackerHeader = memo(
  ({
    titleColor,
    subtitleColor,
    step,
    distance,
    minutes,
  }: TrackerHeaderType) => {
    const getDistance = calculateDistance(step, distance / step).toFixed();

    const { t } = useTranslation();

    return (
      <View style={styles.container}>
        <TrackerHeaderItem
          titleColor={titleColor}
          subtitleColor={subtitleColor}
          value={step}
          title={t('tracker.header.1')}
        />
        <TrackerHeaderItem
          titleColor={titleColor}
          subtitleColor={subtitleColor}
          value={getDistance}
          title={t('tracker.header.2')}
        />
        <TrackerHeaderItem
          titleColor={titleColor}
          subtitleColor={subtitleColor}
          value={minutes}
          title={t('tracker.header.3')}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(15),
    marginBottom: moderateScale(30),
  },
});
