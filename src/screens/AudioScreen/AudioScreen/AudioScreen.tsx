import { AUDIO_URL } from '@env';
import { useHeaderHeight } from '@react-navigation/elements';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  SongType,
  queueInitialTracksService,
  setupAudioService,
} from 'entities/audio';
import { getLanguage } from 'entities/i18n';
import { getPlayerStatus } from 'features/PlayerControl';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import * as Images from 'shared/assets/images';
import { AppNavigation, RootStackParamList } from 'shared/config/navigation';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector';
import { useTheme } from 'shared/lib/theme';
import { ScreenContent } from 'shared/ui/ScreenContent';
import { AudioFooter } from './../AudioFooter/AudioFooter';
import { AudioHeader } from './../AudioHeader/AudioHeader';
import { AudioItem } from './../AudioItem/AudioItem';
import { styles } from './AudioScreenStyle';

type AudioScreenProps = NativeStackScreenProps<
  RootStackParamList,
  AppNavigation.AUDIO
>;

const ImageArtwork = [
  Images.Meditation_1,
  Images.Meditation_2,
  Images.Meditation_3,
  Images.Meditation_4,
  Images.Meditation_5,
];

export const AudioScreen = ({ navigation }: AudioScreenProps) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [localse, setLocales] = useState<boolean[]>([]);

  const language = useAppSelector(getLanguage);
  const playerStatus = useAppSelector(getPlayerStatus);

  const { t } = useTranslation();
  const { cn } = useTheme();
  const headerHeight = useHeaderHeight();

  const covers = t('audio.lists', { returnObjects: true }) as Array<any>;

  const coversMemo = useMemo(() => {
    return covers.map((el, index) => ({
      ...el,
      id: ' ' + index,
      url: `${AUDIO_URL}${index + 1}/${language}.mp3`,
      artwork: ImageArtwork[index],
    }));
  }, [covers, language]) as SongType[];

  useFocusEffect(
    React.useCallback(() => {
      let unmounted = false;

      (async () => {
        try {
          const isSetup = await setupAudioService();
          if (unmounted) {
            return;
          }

          const queue = await TrackPlayer.getQueue();

          if (isSetup && queue.length <= 0) {
            if (coversMemo.length > 0) {
              try {
                await TrackPlayer.reset();
              } catch {}
              try {
                const res = await queueInitialTracksService({
                  tracks: coversMemo,
                  repeat: playerStatus,
                  lang: language,
                });
                setLocales(res.map(el => el.locale));
              } catch {}
            }
          }
          setIsPlayerReady(true);
        } catch {}
      })();

      return () => {
        unmounted = true;
      };
    }, [coversMemo, language]),
  );

  const onPressSelectSound = (index: number) => {
    navigation.navigate(AppNavigation.AUDIO_PLAY, {
      covers: coversMemo,
      isPlayerReady,
      index,
      locale: localse[index],
    });
  };

  return (
    <ScreenContent
      backgroundColor={cn('slate.900', 'slate.200')}
      navigation={navigation}
      excludeEdges={['top', 'bottom']}>
      <View style={[styles.container, { paddingTop: headerHeight }]}>
        {coversMemo.length > 0 && (
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshing={false}
            automaticallyAdjustContentInsets={true}
            ListHeaderComponent={
              <AudioHeader
                titleColor={cn('white', 'black')}
                subtitleColor={cn('slate.200', 'slate.800')}
              />
            }
            ListFooterComponent={
              <AudioFooter
                textColor={cn('slate.200', 'slate.700')}
                linkColor={cn('indigo.500')}
              />
            }
            data={coversMemo}
            renderItem={({ item, index }) => (
              <AudioItem
                key={index}
                index={index}
                title={item.title}
                artwork={ImageArtwork[index]}
                onPressSound={onPressSelectSound}
              />
            )}
          />
        )}
      </View>
    </ScreenContent>
  );
};
