import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { moderateScale } from 'shared/config/dimensions';
import { styles } from './MessageTailStyle';

const directions = {
  left: 'M3 17h6V0c-.193 2.84-.876 5.767-2.05 8.782-.904 2.325-2.446 4.485-4.625 6.48A1 1 0 003 17z',
  right:
    'M6 17H0V0c.193 2.84.876 5.767 2.05 8.782.904 2.325 2.446 4.485 4.625 6.48A1 1 0 016 17z',
};

export const MessageTail = React.memo(
  ({ fill, direction }: { fill: string; direction: 'left' | 'right' }) => (
    <View
      style={[
        styles.tailContainer,
        direction === 'right'
          ? styles.tailContainerRight
          : styles.tailContainerLeft,
      ]}>
      <Svg width={moderateScale(9)} height={moderateScale(20)}>
        <G fill="none" fillRule="evenodd">
          <Path d={directions[direction]} fill={fill} />
        </G>
      </Svg>
    </View>
  ),
);
