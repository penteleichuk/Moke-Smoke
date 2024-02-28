import { memo } from 'react';
import { View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { styles } from './StarRatingStyle';

type StarRatingProps = {
  stairs: number;
  size: number;
  color: string;
  value: number;
  max: number;
};

export const StarRating = memo((props: StarRatingProps) => {
  const { value, max, stairs, size, color } = props;

  const result = (value / max) * 5;

  return (
    <View style={styles.container}>
      <View style={styles.items}>
        {new Array(stairs).fill('').map((_, key) => {
          return key + 1 > result ? (
            <Icons.StarOff key={key} width={size} height={size} fill={color} />
          ) : (
            <Icons.StarOn key={key} width={size} height={size} fill={color} />
          );
        })}
      </View>
    </View>
  );
});
