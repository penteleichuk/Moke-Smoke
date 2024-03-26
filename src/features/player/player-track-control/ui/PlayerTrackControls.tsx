import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, ColorValue, View } from 'react-native';
import TrackPlayer, {
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { styles } from './PlayerTrackControlsStyle';

type PlayerTrackControlsProps = {
  position: number;
  isPlayerReady: boolean;
  fill: ColorValue;
};

const events = [Event.PlaybackState, Event.PlaybackError];

const ICON_SIZE = moderateScale(40);
const CONT_SIZE = moderateScale(25);

export const PlayerTrackControls = memo(
  ({ position, isPlayerReady, fill }: PlayerTrackControlsProps) => {
    const [playerState, setPlayerState] = useState<string | null>(null);
    const { t } = useTranslation();

    useTrackPlayerEvents(events, event => {
      if (event.type === Event.PlaybackError) {
        DisplayMessage({
          message: t('message.error.network.title'),
          description: t('message.error.network.message'),
          type: 'danger',
        });
        setPlayerState(null);
      }

      if (event.type === Event.PlaybackState) {
        setPlayerState(event.state);
      }
    });

    const handlePlayPress = async () => {
      if ((await TrackPlayer.getState()) === State.Playing) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    };

    const handleSekPress = async (pos: number) => {
      TrackPlayer.seekTo(position + pos);
    };

    return (
      <View style={styles.container}>
        {isPlayerReady ? (
          <>
            <PressableOpacity onPress={() => handleSekPress(-10)}>
              <Icons.PlayerPrev
                width={CONT_SIZE}
                height={CONT_SIZE}
                fill={fill}
              />
            </PressableOpacity>

            <PressableOpacity onPress={handlePlayPress}>
              {playerState === 'playing' ? (
                <Icons.PlayerStop
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  fill={fill}
                />
              ) : (
                <Icons.PlayerPlay
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  fill={fill}
                />
              )}
            </PressableOpacity>

            <PressableOpacity onPress={() => handleSekPress(10)}>
              <Icons.PlayerNext
                width={CONT_SIZE}
                height={CONT_SIZE}
                fill={fill}
              />
            </PressableOpacity>
          </>
        ) : (
          <ActivityIndicator size={CONT_SIZE} color={fill} />
        )}
      </View>
    );
  },
);
