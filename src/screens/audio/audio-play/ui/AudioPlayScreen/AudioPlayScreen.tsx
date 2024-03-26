import { useHeaderHeight } from '@react-navigation/elements';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SongType } from 'entities/audio';
import { getSubscriptionIsPremium } from 'entities/subscription';
import { getUserIsPremium } from 'entities/user';
import { getLanguage } from 'features/language-picker';
import {
  PlayerControl,
  PlayerControlStatus,
  getPlayerStatus,
} from 'features/player/player-control';
import { PlayerTrackControls } from 'features/player/player-track-control';
import { PlayerTrackNavigator } from 'features/player/player-track-navigator';
import { useCallback, useEffect, useState } from 'react';
import { ImageBackground, ImageSourcePropType, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, {
  Event,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { AudioDescription } from './../AudioDescription/AudioDescription';
import { AudioDownloadProgress } from './../AudioDownloadProgress/AudioDownloadProgress';
import { AudioTags } from './../AudioTags/AudioTags';
import { styles } from './AudioPlayScreenStyle';

type AudioPlayScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.AUDIO_PLAY
>;

export const AudioPlayScreen = ({
  navigation,
  route,
}: AudioPlayScreenProps) => {
  const { covers, isPlayerReady, index, locale } = route.params;

  const [audioIndex, setAudioIndex] = useState<number>(index);
  const [loader, setLoader] = useState<number>(0);
  const [audio, setAudio] = useState<SongType>(covers[index]);
  const { position, duration } = useProgress(200);

  const playerStatus = useAppSelector(getPlayerStatus);
  const language = useAppSelector(getLanguage);
  const isPremium = useAppSelector(getSubscriptionIsPremium);
  const isUserPremium = useAppSelector(getUserIsPremium);

  const headerHeight = useHeaderHeight();
  const { cn } = useTheme();

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isPlayerReady) {
        await TrackPlayer.skip(audioIndex, 0);
      }
    })();

    return () => {
      if (isMounted) {
        try {
          TrackPlayer.reset();
        } catch (error) {
          console.log('Error resetting TrackPlayer:', error);
        }
        setLoader(0);
        isMounted = false;
      }
    };
  }, [isPlayerReady]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged && event.track !== null) {
      let currentIndex = await TrackPlayer.getCurrentTrack();
      if (currentIndex !== null && currentIndex !== audioIndex) {
        if (playerStatus === PlayerControlStatus.PLAY) {
          TrackPlayer.pause().then(() => TrackPlayer.skip(audioIndex, 0));
          return 0;
        }

        setAudioIndex(currentIndex);
        setAudio(covers[currentIndex]);
      }
    }
  });

  const renderHeaderRight = useCallback(() => {
    return (
      <PlayerControl
        index={index}
        setLoader={setLoader}
        language={language}
        isLocale={locale}
        isPremium={isPremium || isUserPremium}
      />
    );
  }, [index, language, isPremium, isUserPremium]);

  return (
    <ScreenContent
      navigation={navigation}
      excludeEdges={['top', 'bottom']}
      navigationOptions={{ headerRight: renderHeaderRight }}>
      <ImageBackground
        style={[styles.container, { paddingTop: headerHeight }]}
        source={audio.artwork as ImageSourcePropType}
        resizeMode="cover">
        <View style={styles.wrapper}>
          <View style={styles.tags}>
            <AudioTags
              backgroundColor={cn('purple.500')}
              color={cn('white')}
              tags={audio.tags}
            />
          </View>
          <View
            style={[
              styles.content,
              { backgroundColor: cn('slate.900') + '99' },
            ]}>
            <AudioDownloadProgress
              progress={loader}
              backgroundColor={cn('indigo.500')}
            />
            <SafeAreaView style={styles.player} edges={['bottom']}>
              <AudioDescription
                title={audio.title}
                titleColor={cn('white')}
                description={audio.description}
                descriptionColor={cn('slate.300')}
              />
              <PlayerTrackNavigator
                position={position}
                duration={duration}
                color={cn('white')}
                thumbTintColor={cn('white')}
                minimumTrackTintColor={cn('slate.300')}
                maximumTrackTintColor={cn('slate.700')}
              />
              <PlayerTrackControls
                fill={cn('white')}
                position={position}
                isPlayerReady={isPlayerReady}
              />
            </SafeAreaView>
          </View>
        </View>
      </ImageBackground>
    </ScreenContent>
  );
};
