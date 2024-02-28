import Slider from '@react-native-community/slider';
import { memo } from 'react';
import { ColorValue, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { CustomText } from 'shared/ui/CustomText';
import { formatSeconds } from './../model/lib/formatSeconds/formatSeconds';
import { styles } from './PlayerTrackNavigatorStyle';

type PlayerTrackNavigatorProps = {
  position: number;
  duration: number;
  color: ColorValue;
  thumbTintColor: string;
  minimumTrackTintColor: string;
  maximumTrackTintColor: string;
};

export const PlayerTrackNavigator = memo(
  ({
    position,
    duration,
    color,
    thumbTintColor,
    minimumTrackTintColor,
    maximumTrackTintColor,
  }: PlayerTrackNavigatorProps) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Slider
            value={position}
            minimumValue={0}
            maximumValue={duration}
            thumbTintColor={thumbTintColor}
            minimumTrackTintColor={minimumTrackTintColor}
            maximumTrackTintColor={maximumTrackTintColor}
            tapToSeek={true}
            onSlidingComplete={TrackPlayer.seekTo}
          />
          <View style={styles.labels}>
            <CustomText style={[styles.text, { color }]}>
              {formatSeconds(position)}
            </CustomText>
            <CustomText style={[styles.text, { color }]}>
              {formatSeconds(Math.max(0, duration - position))}
            </CustomText>
          </View>
        </View>
      </View>
    );
  },
);
