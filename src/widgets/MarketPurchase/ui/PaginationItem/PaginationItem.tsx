import React from 'react';
import { ColorValue, View } from 'react-native';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { moderateScale } from 'react-native-size-matters';
import { styles } from './PaginationItemStyle';

type PaginationItemProps = {
  index: number;
  backgroundColor: ColorValue;
  backgroundColorNot: ColorValue;
  length: number;
  animValue: SharedValue<number>;
  isRotate?: boolean;
};

const width = moderateScale(10);

export const PaginationItem = React.memo((props: PaginationItemProps) => {
  const {
    animValue,
    index,
    length,
    backgroundColor,
    backgroundColorNot,
    isRotate,
  } = props;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColorNot,
          width,
          marginRight: moderateScale(index + 1 !== length ? 10 : 0),
          height: width,
          transform: [
            {
              rotateZ: isRotate ? '90deg' : '0deg',
            },
          ],
        },
      ]}>
      <Animated.View
        style={[
          styles.animated,
          {
            backgroundColor,
          },
          animStyle,
        ]}
      />
    </View>
  );
});
