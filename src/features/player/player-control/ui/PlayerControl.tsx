import {
  downloadTrackService,
  queueInitialRepeatService,
} from 'entities/audio';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { AppNavigation } from 'shared/config/navigation';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { useAppNavigation } from 'shared/hooks/useAppNavigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { DisplayMessage } from 'shared/ui/DisplayMessage';
import { PressableOpacity } from 'shared/ui/PressableOpacity';
import { PlayerControlStatus } from './../model/const/control';
import { getPlayerStatus } from './../model/selectors/getPlayerStatus/getPlayerStatus';
import { setPlayerStatus } from './../model/slices/playerSlice';
import { styles } from './PlayerControlStyle';

const ICON_SIZE = moderateScale(20);

interface PlayerControlProps {
  isPremium: boolean;
  index: number;
  language: string;
  isLocale: boolean;
  setLoader: (value: number) => void;
}

export const PlayerControl = memo((props: PlayerControlProps) => {
  const { isPremium, index, language, isLocale, setLoader } = props;

  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const { t } = useTranslation();
  const { cn } = useTheme();

  const [isDownload, setIsDownload] = useState(false);
  const [isPlayLocale, setIsPlayLocale] = useState(isLocale);

  const playerStatus = useAppSelector(getPlayerStatus);

  const OnPressAudioRepeat = async (value: PlayerControlStatus) => {
    if (!isPremium) {
      navigation.navigate(AppNavigation.SUBS);
    } else {
      dispatch(setPlayerStatus(value));
      await queueInitialRepeatService(value);
    }
  };

  const OnPressDownload = async () => {
    if (!isPremium) {
      navigation.navigate(AppNavigation.SUBS);
    } else {
      setIsDownload(true);
      const res = await downloadTrackService({
        index: index + 1,
        lang: language,
        setLoader,
      });
      if (res.status === 'success') {
        setIsPlayLocale(true);
      } else if (res.status === 'error') {
        DisplayMessage({
          message: t('message.error.network.title'),
          description: t('message.error.network.message'),
          type: 'danger',
        });
      }

      setIsDownload(false);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.content, { backgroundColor: cn('slate.900') + '99' }]}>
        <PressableOpacity
          onPress={() => OnPressAudioRepeat(PlayerControlStatus.PLAY)}>
          <Icons.PlayerSingle
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={
              playerStatus === PlayerControlStatus.PLAY
                ? cn('indigo.400')
                : cn('white')
            }
          />
        </PressableOpacity>
        <PressableOpacity
          onPress={() => OnPressAudioRepeat(PlayerControlStatus.REPEAT)}>
          <Icons.PlayerRepeat1
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={
              playerStatus === PlayerControlStatus.REPEAT
                ? cn('indigo.400')
                : cn('white')
            }
          />
        </PressableOpacity>
        <PressableOpacity
          onPress={() => OnPressAudioRepeat(PlayerControlStatus.CIRCLE)}>
          <Icons.PlayerRepeat2
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={
              playerStatus === PlayerControlStatus.CIRCLE
                ? cn('indigo.400')
                : cn('white')
            }
          />
        </PressableOpacity>
      </View>
      {isPlayLocale === false && (
        <View
          style={[
            styles.content,
            styles.download,
            { backgroundColor: cn('slate.900') + '99' },
          ]}>
          <PressableOpacity disabled={isDownload} onPress={OnPressDownload}>
            <Icons.Download
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={
                playerStatus === PlayerControlStatus.PLAY
                  ? cn('green.400')
                  : cn('white')
              }
            />
          </PressableOpacity>
        </View>
      )}
    </View>
  );
});
