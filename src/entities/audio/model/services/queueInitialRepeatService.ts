import TrackPlayer, { RepeatMode } from 'react-native-track-player';

export const queueInitialRepeatService = async (repeat: number = 0) => {
  if (repeat === 0) {
    await TrackPlayer.setRepeatMode(RepeatMode.Off);
  } else if (repeat === 1) {
    await TrackPlayer.setRepeatMode(RepeatMode.Track);
  } else if (repeat === 2) {
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  }
};
