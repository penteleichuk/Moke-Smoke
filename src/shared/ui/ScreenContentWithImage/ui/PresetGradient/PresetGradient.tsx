import { memo } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Images from 'shared/assets/images';
import { styles } from './PresetGradientStyle';

type PresetGradientProps = {
  image?: boolean;
  absolute?: boolean;
  color: string;
  height?: number;
  source?: ImageSourcePropType;
  gradients?: string[];
};

export const PresetGradient = memo((props: PresetGradientProps) => {
  const {
    image = true,
    absolute = false,
    height = 230,
    color,
    source = Images.Icons,
    gradients = [color, 'transparent'],
  } = props;

  return (
    <LinearGradient
      style={[styles.mask, absolute && styles.absoulte, { height }]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.9 }}
      locations={[0.0, 0.9]}
      colors={gradients}>
      {image && (
        <Image resizeMode={'cover'} style={styles.logo} source={source} />
      )}
    </LinearGradient>
  );
});
