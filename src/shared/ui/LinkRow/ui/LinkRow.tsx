import React, { memo } from 'react';
import { Animated, ColorValue, Pressable, View } from 'react-native';
import * as Icons from 'shared/assets/icons';
import { moderateScale } from 'shared/config/dimensions';
import { CustomText, TextSize, TextWeight } from 'shared/ui/CustomText';
import { styles } from './LinkRowStyle';

type LinkRowProps = {
  text: string;
  Icon?: React.ElementType;
  colorIcon: ColorValue;
  backgroundColorIcon: ColorValue;
  textColor: ColorValue;
  onPress: () => void;
};

const ICON_SIZE = moderateScale(18);
const ICON_ARROW_SIZE = moderateScale(12);

export const LinkRow = memo((props: LinkRowProps) => {
  const { text, onPress, Icon, colorIcon, backgroundColorIcon, textColor } =
    props;

  const animated = new Animated.Value(1);

  const fadeIn = () => {
    Animated.timing(animated, {
      toValue: 0.1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable onPressIn={fadeIn} onPressOut={fadeOut} onPress={onPress}>
      <Animated.View style={[styles.container, { opacity: animated }]}>
        <View style={styles.content}>
          {Icon && (
            <View
              style={[styles.icon, { backgroundColor: backgroundColorIcon }]}>
              <Icon width={ICON_SIZE} height={ICON_SIZE} fill={colorIcon} />
            </View>
          )}
          <CustomText
            weight={TextWeight.MEDIUM}
            size={TextSize.S_XL}
            style={{ color: textColor }}>
            {text}
          </CustomText>
        </View>
        <View style={styles.arrow}>
          <Icons.ArowText
            fill={textColor}
            width={ICON_ARROW_SIZE}
            height={ICON_ARROW_SIZE}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
});
