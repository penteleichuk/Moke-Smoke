import TrackPlayer from 'react-native-track-player';
import { SongType } from './../types/song';
import { getLocalTrackPath } from './getLocalTrackPath';
import { queueInitialRepeatService } from './queueInitialRepeatService';

type QueueInitialTracksServiceProps = {
  tracks: SongType[];
  repeat: number;
  lang: string;
};

export const queueInitialTracksService = async ({
  tracks,
  repeat = 0,
  lang,
}: QueueInitialTracksServiceProps) => {
  const updatedArray = await Promise.all(
    tracks.map(async (item, index) => {
      const newUrl = await getLocalTrackPath(item.url, index + 1, lang);
      return { ...item, url: newUrl.url, locale: newUrl.locale };
    }),
  );

  await TrackPlayer.add(updatedArray);
  await queueInitialRepeatService(repeat);

  return updatedArray;
};
