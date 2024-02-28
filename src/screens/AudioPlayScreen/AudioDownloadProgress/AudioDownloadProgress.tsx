import { memo } from 'react';
import { ColorValue, View } from 'react-native';
import { styles } from './AudioDownloadProgressStyle';

interface AudioDownloadProgressProps {
  progress: number;
  backgroundColor: ColorValue;
}

export const AudioDownloadProgress = memo(
  ({ progress, backgroundColor }: AudioDownloadProgressProps) => {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor },
          { width: `${progress}%` },
        ]}
      />
    );
  },
);
